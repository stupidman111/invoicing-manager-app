"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//定义表单数据校验规则
const formSchema = z.object({
  billingName: z.string().min(2, {
    message: "Billing Name must be at least 2 characters.",
  }),
  billingEmail: z.string().email({
    message: "Billing Email must valid.",
  }),
  value: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    },
    z.number().positive({
      message: "Value must be a positive number.",
    })
  ),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billingName: "",
      billingEmail: "",
      value: 0,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="flex flex-col justify-center h-full gap-8 text-center max-w-5xl mx-auto my-16 p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Create a New Invoice
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/** Billing Name */}
          <FormField
            control={form.control}
            name="billingName"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-lg font-semibold text-gray-700">
                  Billing Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your billing name"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500 mt-1">
                  This is your Billing Name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Billing Email */}
          <FormField
            control={form.control}
            name="billingEmail"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-lg font-semibold text-gray-700">
                  Billing Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your billing email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500 mt-1">
                  This is your Billing Email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Value */}
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-lg font-semibold text-gray-700">
                  Value
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your value"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500 mt-1">
                  This is your value.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-lg font-semibold text-gray-700">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your description"
                    {...field}
                  />
                  {/* <Input
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your description"
                    {...field}
                  /> */}
                </FormControl>
                <FormDescription className="text-sm text-gray-500 mt-1">
                  This is your description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
