"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import useDonorsForDonation from "@/hooks/donations/useDonorsForDonation";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/Loading";
import useCreateDonation from "@/hooks/donations/useCreateDonation";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface donorProps {
  value: number;
  label: string;
}

const donationCreateSchema = z.object({
  lastDate: z.date({
    required_error: "Last date is required.",
  }),
  donorId: z.number({ required_error: "Please select a donor." }),
});

const DonationCreate = () => {
  const [donorsOptions, setDonorsOptions] = useState<donorProps[]>([]);
  const {
    data,
    isLoading: donorsLoading,
    isSuccess: donorsSuccess,
  } = useDonorsForDonation();
  const {
    mutate,
    isSuccess: donationSuccess,
    isLoading: donationLoading,
    isError: donationError,
    error,
  } = useCreateDonation();

  const router = useRouter();

  const form = useForm<z.infer<typeof donationCreateSchema>>({
    resolver: zodResolver(donationCreateSchema),
  });

  function onSubmit(values: z.infer<typeof donationCreateSchema>) {
    const { donorId, lastDate } = values;
    const formData = { donorId, lastDate: lastDate.toISOString() };
    mutate(formData);
  }

  useEffect(() => {
    if (donorsSuccess) {
      const formattedDonorOptions = data.donors.map(
        ({ id, name }: { id: number; name: string }) => ({
          value: id,
          label: name,
        })
      );
      setDonorsOptions(formattedDonorOptions);
    }
  }, [donorsSuccess]);

  useEffect(() => {
    if (donationSuccess) {
      toast({
        description: "လှူဒါန်းမှုအသစ် ထည့်ပြီးပါပြီ။",
      });

      router.refresh();
      router.replace("/donors");
    }

    if (donationError) {
      toast({
        variant: "destructive",
        title: (error as Error).message,
      });
    }
  }, [donationSuccess, donationError, error, toast, router, data]);

  if (donorsLoading) {
    return <Loading />;
  }

  return (
    <section className="overflow-y-auto grow">
      <div className="container flex flex-col py-10 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Donor Select */}
            <div className="flex flex-col gap-4 mb-8">
              <Label
                className={`font-semibold ${
                  form.formState.errors.donorId ? "text-destructive" : null
                }`}
              >
                လှူဒါန်းသူ
              </Label>
              <Controller
                rules={{ required: true }}
                control={form.control}
                name="donorId"
                render={({ field }) => (
                  <Select
                    options={donorsOptions}
                    placeholder="Select a donor..."
                    value={donorsOptions.find(
                      ({ value }) => value === field.value
                    )}
                    onChange={(val) => field.onChange(val?.value)}
                    classNames={{
                      control: () => "px-3 py-1 border border-input",
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 12,
                      colors: {
                        ...theme.colors,
                        primary: "#e11d48",
                        primary25: "rgba(225, 29, 72, 0.25)",
                      },
                    })}
                    isClearable
                  />
                )}
              />
              {form.formState.errors.donorId ? (
                <span className="text-sm text-destructive">
                  {form.formState.errors.donorId.message}
                </span>
              ) : null}
            </div>
            {/* Last Date */}
            <FormField
              control={form.control}
              name="lastDate"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel className="mb-4 font-semibold">
                    နောက်ဆုံးလှူသည့်ရက်စွဲ (နှစ်-လ-ရက်)
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full py-[22px] text-md    justify-start  text-left font-normal ${
                            field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={"outline"}
              className="mt-8 text-sm font-semibold ml-auto block bg-[#e11d48] text-white hover:bg-[#e11d48]/90 hover:text-white"
              disabled={donationLoading}
            >
              <div className="flex items-center">
                {donationLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                သိမ်းပါ
              </div>
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default DonationCreate;
