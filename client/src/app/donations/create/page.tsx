"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import useDonorsForDonation from "@/hooks/donations/useDonorsForDonation";

import { Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

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
import { Input } from "@/components/ui/input";

interface donorProps {
  value: number;
  label: string;
}

const donationCreateSchema = z.object({
  lastDate: z.string().nonempty({ message: "Last date is required!" }),
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
    const lastDateInISOFormat = new Date(lastDate).toISOString();
    const formData = { donorId, lastDate: lastDateInISOFormat };
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
              render={() => (
                <FormItem className="w-full space-y-4">
                  <FormLabel className="font-semibold">
                    နောက်ဆုံးလှူသည့်ရက်စွဲ (လ-ရက်-နှစ်)
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...form.register("lastDate")} />
                  </FormControl>
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
