"use client";

import React, { useEffect } from "react";
import Select from "react-select";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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

import useIsMounted from "@/hooks/useIsMounted";
import useUpdateDonor from "@/hooks/donors/useUpdateDonor";
import useDonor from "@/hooks/donors/useDonor";
import useLogout from "@/hooks/auth/useLogout";
import SessionExpireModal from "@/components/SessionExpireModal";
import Loading from "@/components/Loading";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

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

const editFormSchema = z.object({
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

const EditDonor = () => {
  const isMounted = useIsMounted();

  const currentPath = usePathname();
  const router = useRouter();

  const userId = currentPath.split("/").pop() || "";

  const {
    data,
    isLoading: donorIsLoading,
    isError: donorIsError,
    isSuccess: donorIsSuccess,
    error: donorError,
  } = useDonor(parseInt(userId));

  const {
    mutate,
    isLoading: updateIsLoading,
    isError: updateIsError,
    isSuccess: updateIsSuccess,
    error: updateError,
  } = useUpdateDonor();

  const {
    mutate: logoutMutate,
    isLoading: logoutLoading,
    isSuccess: logoutSuccess,
  } = useLogout();

  useEffect(() => {
    if (logoutSuccess) {
      router.push("/login");
    }
  }, [logoutSuccess]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
  });

  useEffect(() => {
    if (!donorIsLoading && donorIsSuccess) {
      const parsedDate = new Date(data.donor.dob);

      form.reset(data.donor);
      form.setValue("dob", parsedDate.toISOString().split("T")[0]);
    }
  }, [donorIsLoading, donorIsSuccess, form, data]);

  useEffect(() => {
    if (updateIsSuccess) {
      toast({
        description: "Successfully updated!",
      });

      router.push("/donors");
    }

    if (updateIsError) {
      toast({
        variant: "destructive",
        title: (updateError as Error).message,
      });
    }
  }, [updateIsSuccess, updateIsError, updateError, toast, router]);

  const onSubmit = (values: z.infer<typeof editFormSchema>) => {
    const { name, address, dob, phone, bloodType } = values;

    const dobInISOFormat = new Date(dob).toISOString();

    mutate({
      id: parseInt(userId),
      data: { name, address, phone, bloodType, dob: dobInISOFormat },
    });
  };

  if (!isMounted) {
    return null;
  }

  if (donorIsLoading) {
    return <Loading />;
  }

  if (donorIsError && !donorIsLoading) {
    return (
      <SessionExpireModal logoutLoading={logoutLoading} mutate={logoutMutate} />
    );
  }

  return (
    <section className="py-5 overflow-y-auto md:py-10 grow">
      <div className="container space-y-6">
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

            <div className="flex items-center justify-end gap-4">
              <Button
                variant={"outline"}
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </Button>

              <Button type="submit" className="text-sm w-fit">
                {updateIsLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                သိမ်းပါ
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default EditDonor;
