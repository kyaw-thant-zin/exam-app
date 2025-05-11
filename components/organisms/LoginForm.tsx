import { cn } from '@/utils';
import { View } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../atoms/ui/card';
import { Button } from '../atoms/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../molecules/form';
import { Input } from '../atoms/ui/input';
import { LoginFormData, loginFormSchema } from '@/libs/validations/schema';
import { Text } from '../atoms/ui/text';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { useLogin } from '@/services/auth/mutations';

export function LoginForm({ className, ...props }: { className?: string }) {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'user@mail.com',
      password: '123123123',
    },
  });
  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => {
      return useLogin(data);
    },
    onSuccess: (res) => {
      console.log(res, 'success  Logins');
      if (res?.data?.token) {
        router.push('/(tabs)');
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });
      }
    },
    onError: (error) => {
      console.log(error, 'Error.....');
      alert(`${error.message}`);
      router.push('/(tabs)');
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // router.push('/(tabs)');
    mutation.mutateAsync(data);
  };

  return (
    <View className={cn('w-full flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View className="flex flex-col gap-6">
            <Form {...form}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          onChangeText={field.onChange}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        onChangeText={field.onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Form>
            {/* <View className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <FormField
                name="email"
                control={control}
                render={({ field }) => (
                  <Input placeholder="m@example.com" {...field} />
                )}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address"
                  }
                }}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
              )}
            </View>
            <View className="grid gap-2">
              <FormField
                name="password"
                control={control}
                render={({ field }) => <Input {...field} />}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                }}
              />
              {errors.password && (
                <Text className="text-red-500">{errors.password.message}</Text>
              )}
            </View> */}
            <Button onPress={form.handleSubmit(onSubmit)} className="w-full">
              <Text>Login</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
