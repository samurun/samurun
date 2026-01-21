'use client';

import { LockIcon, User2Icon, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { loginAction } from './actions';

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-muted/40 p-4'>
      <div className='w-full max-w-md space-y-8'>
        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <InputGroup>
                  <InputGroupInput
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    required
                  />
                  <InputGroupAddon>
                    <User2Icon />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <InputGroup>
                    <InputGroupInput
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Enter your password'
                      required
                    />
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>

              {error && (
                <p className='text-sm font-medium text-destructive'>{error}</p>
              )}

              <Button className='w-full' type='submit' disabled={isPending}>
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
