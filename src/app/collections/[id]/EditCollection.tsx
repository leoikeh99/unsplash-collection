"use client";
import {
  Dialog,
  DialogDismiss,
  DialogHeading,
  useDialogStore,
} from "@ariakit/react";
import { Edit, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { editCollectionAction } from "@/actions/collections";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  id: string;
  title: string;
  description: string | null;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const EditCollection = ({ title, description, id }: Props) => {
  const dialogStore = useDialogStore();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description: description || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("id", id);

    setLoading(true);
    editCollectionAction(formData).then((res) => {
      toast({
        title: !res.error ? "Success" : "Error",
        description: res.message,
        variant: res.error ? "destructive" : "default",
      });
      setLoading(false);
    });
  }

  return (
    <div>
      <button
        className="btn-ghost btn-sm text-[#6C727F]"
        onClick={() => dialogStore.show()}
      >
        <Edit size="16" /> Edit
      </button>
      <Dialog
        store={dialogStore}
        backdrop={
          <div className="bg-black opacity-0 transition-opacity data-[enter]:opacity-40 data-[leave]:opacity-0" />
        }
        className="fixed inset-[0.75rem] m-auto flex gap-4 flex-col h-fit max-h-[75dvh] z-50 max-w-md bg-background p-5 rounded-md transition-transform origin-center scale-95 data-[enter]:scale-100 data-[leave]:scale-95"
      >
        <div className="flex items-center justify-between">
          <DialogHeading className="text-lg font-semibold">
            Edit Collection
          </DialogHeading>
          <DialogDismiss className="p-2 border border-[#E5E7EB] rounded-md">
            <X size="16" />
          </DialogDismiss>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <button type="submit" className="btn btn-base" disabled={loading}>
                Edit
              </button>
            </div>
          </form>
        </Form>
      </Dialog>
    </div>
  );
};

export default EditCollection;
