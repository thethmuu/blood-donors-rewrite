"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
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
import useCreateDonation from "@/hooks/donations/useCreateDonation";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import getDonorsForDonation from "@/services/donations/getDonorsForDonation";
import useIsMounted from "@/hooks/useIsMounted";
import { format } from "date-fns";

interface DonorProps {
  value: number;
  label: string;
}

const donationCreateSchema = z.object({
  lastDate: z.date(),
  count: z.number().nonnegative().min(1, "Count must be greater than zero!"),
  donor: z.object({ value: z.number(), label: z.string() }),
});

const DonationCreate = () => {
  const isMounted = useIsMounted();

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

  const donor = form.watch("donor");

  function onDonorChange(value: DonorProps) {
    form.setValue("donor", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  function onSubmit(values: z.infer<typeof donationCreateSchema>) {
    const { donor, lastDate, count } = values;
    const lastDateInISOFormat = new Date(lastDate).toISOString();
    const formData = {
      donorId: donor.value,
      lastDate: lastDateInISOFormat,
      count,
    };
    mutate(formData);
  }

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
  }, [donationSuccess, donationError, error, toast, router]);

  const promiseOptions = async (search: string) => {
    const data = await getDonorsForDonation(search);
    return data.donors;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-5 overflow-y-auto md:py-10 grow">
      <div className="container space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Donor Select */}
            <div className="flex flex-col gap-4 mb-8">
              <Label
                className={`font-semibold ${
                  form.formState.errors.donor ? "text-destructive" : null
                }`}
              >
                လှူဒါန်းသူ
              </Label>
              <AsyncSelect
                loadOptions={promiseOptions}
                placeholder="Select a donor..."
                value={donor}
                onChange={(value) => {
                  onDonorChange(value as DonorProps);
                }}
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
                noOptionsMessage={() => "Please search to select donor."}
              />
              {form.formState.errors.donor ? (
                <span className="text-sm text-destructive">
                  Donor is required!
                </span>
              ) : null}
            </div>
            {/* Count */}
            <FormField
              control={form.control}
              name="count"
              render={() => (
                <FormItem className="w-full mb-8 space-y-4">
                  <FormLabel className="font-semibold">အကြိမ်မြောက်</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...form.register("count", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input
                      type="date"
                      {...form.register("lastDate", { valueAsDate: true })}
                      defaultValue={format(new Date(), "yyyy-MM-dd")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={"outline"}
              className="mt-8 text-sm ml-auto block bg-[#e11d48] text-white hover:bg-[#e11d48]/90 hover:text-white"
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
