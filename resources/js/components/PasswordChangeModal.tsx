import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import InputError from './input-error';
import { PasswordInput } from './ui/password-input';
import { toast } from 'sonner';

export default function PasswordChangeModal({ auth_type }: { auth_type: 'admin' | 'driver' }) {
    const [open, setOpen] = useState(false); // ✅ Manage dialog visibility

    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route(`${auth_type}.password.change`), {
            onSuccess: () => {
                toast.success('Password changed successfully.');
                reset();
                setOpen(false); // ✅ Close the dialog
            },
            onError: () => {
                toast.error('Failed to change password.');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* <Button variant="outline" onClick={() => setOpen(true)}>
                    Change Password
                </Button> */}
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 font-medium cursor-pointer"
                >
                    Change Password
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Update your account password below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                            <Label htmlFor="current_password">Old Password</Label>
                            <PasswordInput
                                id="current_password"
                                name="current_password"
                                value={data.current_password}
                                className="col-span-3"
                                onChange={(e) => setData('current_password', e.target.value)}
                                required
                            />
                            <InputError message={errors.current_password} />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="password">New Password</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                value={data.password}
                                className="col-span-3"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="col-span-3"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
