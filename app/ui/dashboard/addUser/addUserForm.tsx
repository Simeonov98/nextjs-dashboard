
'use client'
import { role, users } from 'prisma/generated/prisma/client';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { createUser } from '@/app/lib/userActions';
import { useState, useMemo, useActionState } from 'react';
export default function AddUserForm({ owner, roles, allUsers }: { owner: users; roles: role[], allUsers: users[] }) {
    const [state,formAction]= useActionState(createUser,{success: false})
    const [selectedRoleId, setSelectedRoleId] = useState<number>()
    const [managerFocused, setManagerFocused] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("/Public/defaultUser.jpeg");


    const selectedRole = roles.find(r => r.id === selectedRoleId)

    const eligibleManagers = useMemo(() => {
        if (!selectedRole) return []
        return allUsers.filter((u) => {
            const userRole = roles.find(r => r.id === u.roleId)
            if (!userRole) return false;

            return userRole.level < selectedRole.level
        });
    }, [selectedRole, allUsers, roles])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };
    return (
        
        <form action={formAction}>
            <div className='relative w-full h-full bg-neutral-50 border rounded border-xl'>
                <div className='flex flex-col-2 w-90'>
                    {/* Left */}
                    <div className='flex flex-col m-4'>
                        {/* Name */}
                        <div className='flex flex-col m-4'>
                            <label htmlFor='employeeName' className='mb-1 text-sm'>
                                Employee name:
                            </label>
                            <input id='employeeName' name='name' className='border rounded-md p-2 outline-2' required placeholder='Add first name' />
                        </div>
                        {/* Email */}
                        <div className='flex flex-col m-4'>
                            <label htmlFor='employeeEmail' className='mb-1 text-sm'>
                                Employee email:
                            </label>
                            <input id='employeeEmail' name='email' type='email' className='border rounded-md p-2 outline-2' required placeholder='Add email' />
                        </div>
                        {/* Password */}
                        <div className='flex flex-col m-4'>
                            <label htmlFor='employeePassword' className='mb-1 text-sm'>
                                Employee password:
                            </label>
                            <input id='employeePassword' name='password' type='password' className='border rounded-md p-2 outline-2' required placeholder='Set password (min 6 chars)' />
                        </div>
                        {/* Role selection */}
                        <div className='flex flex-col m-4'>
                            <label htmlFor='employeeRole' className='mb-1 text-sm'>
                                Employee role:
                            </label>
                                <select
                                    id='employeeRole'
                                    name='roleId'
                                    className='border rounded-md p-2 outline-2'
                                    defaultValue=''
                                    required
                                    value={selectedRoleId}
                                    onChange={(e) => setSelectedRoleId(parseInt(e.target.value))}
                                >
                                <option value='' disabled >Select a role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col m-4'>
                            <label className='mb-1 text-sm'>Manager:</label>
                            <select 
                                id='managerId'
                                className='border rounded-md p-2 outline-2'
                                disabled={!selectedRoleId}
                                defaultValue=''
                                required
                                aria-placeholder='Select manager'
                                onFocus={() => setManagerFocused(true)}
                                >
                                    {!selectedRoleId &&(
                                        <option value="">Select employee role first</option>
                                    )}
                                    {selectedRoleId && eligibleManagers.length===0 &&(
                                        <option value="">No eligible managers</option>
                                    )}
                                    {managerFocused && eligibleManagers.map((m)=>(
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className='flex flex-col m-4 justify-end'>
                            <button 
                            type='submit'
                            className='w-24 bg-green-500 border outline-2 shadow-md text-white rounded-md '
                            >
                                Add User
                            </button>
                            {state?.error && (
                                <div className='text-red-500'>
                                    {typeof state.error === 'string'
                                        ? state.error
                                        : state.error?.email
                                        ? Array.isArray(state.error.email)
                                            ? state.error.email.join(' ')
                                            : String(state.error.email)
                                        : JSON.stringify(state.error)}
                                </div>
                            )}
                            {state?.success && <div className='text-green-500'>User created!</div>}
                        </div>
                    </div>
                    {/* RIght Side (Avatar) */}
                    <div className='flex flex-col items-center m-4'>
                        {/* Img preview */}
                        <div className='flex flex-col m-4'>
                            <img 
                                src={imagePreview}
                                alt="User preview"
                                className='w-40 h-40 object-cover rounded-full border shadow-md'
                            />
                            {/* Upload input */}
                            <label className="mt-4 text-sm font-medium">Upload Photo:</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-2"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}