"use client";

import React, { useEffect } from "react";
import Select from "react-select";
import * as z from "zod";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import useCreateDonor from "@/hooks/donors/useCreateDonor";
import useIsMounted from "@/hooks/useIsMounted";

const BloodTypeOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "O", label: "O" },
  { value: "AB", label: "AB" },
  { value: "-A", label: "-A" },
  { value: "-B", label: "-B" },
  { value: "-O", label: "-O" },
  { value: "-AB", label: "-AB" },
];

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const createFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name must contain at least 1 character(s)!" }),
  dob: z.string().nonempty({ message: "A date of birth is required!" }),
  phone: z
    .string()
    .nonempty({ message: "Please add a phone number!" })
    .regex(phoneRegex, "Invalid Number!"),
  address: z
    .string()
    .nonempty({ message: "Address must contain at least 1 character(s)!" }),
  bloodType: z.string({ required_error: "Please select a blood type!" }),
});

const CreateDonor = () => {
  const isMounted = useIsMounted();

  const { mutate, isLoading, isError, isSuccess, error } = useCreateDonor();

  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Successfully created!",
      });

      router.push("/donors");
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: (error as Error).message,
      });
    }
  }, [isSuccess, isError, error, toast, router]);

  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    const { name, address, dob, phone, bloodType } = values;
    console.log(dob);

    const dobInISOFormat = new Date(dob).toISOString();

    mutate({
      name,
      address,
      phone,
      bloodType,
      dob: dobInISOFormat,
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="overflow-y-auto grow">
      <div className="container min-h-full py-5 md:py-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mx-auto"
          >
            {/* name & dob*/}
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="name"
                render={() => (
                  <FormItem className="w-1/2">
                    <FormLabel className="font-semibold">အမည်</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...form.register("name")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={() => (
                  <FormItem className="w-1/2">
                    <FormLabel className="font-semibold">မွေးနေ့</FormLabel>
                    <FormControl>
                      <Input type="date" {...form.register("dob")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={() => (
                <FormItem>
                  <FormLabel className="font-semibold">ဖုန်း</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...form.register("phone")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* address */}
            <FormField
              control={form.control}
              name="address"
              render={() => (
                <FormItem>
                  <FormLabel className="font-semibold ">လိပ်စာ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address"
                      {...form.register("address")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* blood type */}
            <div className="flex flex-col gap-4 mb-8">
              <Label
                className={`font-semibold ${
                  form.formState.errors.bloodType ? "text-destructive" : null
                }`}
              >
                သွေး
              </Label>
              <Controller
                rules={{ required: true }}
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <Select
                    options={BloodTypeOptions}
                    placeholder="Select a blood type..."
                    value={BloodTypeOptions.find(
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
              {form.formState.errors.bloodType ? (
                <span className="text-sm text-destructive">
                  {form.formState.errors.bloodType.message}
                </span>
              ) : null}
            </div>

            <Button type="submit" className="text-sm font-semibold w-fit">
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              သိမ်းပါ
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreateDonor;
