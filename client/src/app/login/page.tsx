"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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

import useLogin from "@/hooks/auth/useLogin";
import useIsMounted from "@/hooks/useIsMounted";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email!"),
  password: z.string(),
});

const Login = () => {
  const isMounted = useIsMounted();

  const { mutate, isError, isSuccess, isLoading, error, data } = useLogin();
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Login success!",
      });

      router.refresh();
      router.replace("/donors");
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: (error as Error).message,
      });
    }
  }, [isSuccess, isError, error, toast, router, data]);

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    mutate(values);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <section className="flex items-center justify-center py-10 overflow-y-auto grow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container max-w-xl p-4 mx-auto space-y-4 border rounded"
        >
          <FormField
            control={form.control}
            name="email"
            render={() => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...form.register("email")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={() => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...form.register("password")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"outline"}
            className="text-sm font-semibold"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {isLoading ? "Logging" : "Login"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Login;
