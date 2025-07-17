import React, { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const steps = ['Basic Info', 'Media', 'Procurement', 'Usage', 'Custom Fields'];

const categories = [
    'Power Tools',
    'Electrical',
    'Inspection',
    'Safety Gear',
    'HVAC Tools',
    'IT Equipment',
    'Pneumatic',
    'Welding'
];

const tagsList = ['Portable', 'Heavy Duty', 'Battery', 'Manual', 'Digital', 'Calibrated', 'Spare', 'Critical'];

const meterUnits = ['Miles', 'Kilometers', 'Hours', 'Minutes', 'Cycles', 'Starts', 'Jobs'];

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    make: z.string().optional(),
    model: z.string().optional(),
    serialNumber: z.string().min(1, 'Serial Number is required'),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    photo: z.any().optional(),
    purchaseDate: z.string().optional(),
    purchaseCost: z.string().optional(),
    supplier: z.string().optional(),
    warrantyStart: z.string().optional(),
    warrantyEnd: z.string().optional(),
    meterType: z.string().optional(),
    initialMeter: z.string().optional(),
    meterUnit: z.string().optional(),
    customFields: z.record(z.string(), z.string()).optional()
});

type FormData = z.infer<typeof schema>;

export default function EquipmentForm() {
    const [step, setStep] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [autosave, setAutosave] = useState<FormData | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: autosave || {},
        mode: 'onChange'
    });

    // Autosave on change
    React.useEffect(() => {
        const subscription = watch((value: any) => setAutosave(value as FormData));
        return () => subscription.unsubscribe();
    }, [watch]);

    // Handle file upload and preview
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('photo', file);
            const reader = new FileReader();
            reader.onload = (ev) => setImagePreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Dynamic custom fields based on category (placeholder logic)
    const selectedCategory = watch('category');
    const customFields =
        selectedCategory === 'Electrical'
            ? ['Voltage', 'Amperage']
            : selectedCategory === 'Power Tools'
              ? ['Power', 'RPM']
              : [];

    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const prev = () => setStep((s) => Math.max(s - 1, 0));

    const onSubmit = (data: FormData) => {
        alert('Equipment saved!\n' + JSON.stringify(data, null, 2));
    };

    return (
        <div className='equipment-form mx-auto max-w-2xl rounded border bg-white p-4 shadow'>
            <div className='mb-4 flex gap-2'>
                {steps.map((label, idx) => (
                    <button
                        key={label}
                        className={`rounded px-3 py-1 ${step === idx ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setStep(idx)}
                        type='button'>
                        {label}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {step === 0 && (
                    <div>
                        <h2 className='mb-2 text-lg font-bold'>Basic Info</h2>
                        <div className='mb-2'>
                            <input
                                {...register('name')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Equipment Name'
                            />
                            {errors.name && <div className='text-sm text-red-600'>{errors.name.message}</div>}
                        </div>
                        <div className='mb-2'>
                            <select
                                {...register('category')}
                                className='w-full rounded border px-2 py-1'
                                defaultValue=''>
                                <option value='' disabled>
                                    Select Category
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <div className='text-sm text-red-600'>{errors.category.message}</div>}
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('make')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Make'
                            />
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('model')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Model'
                            />
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('serialNumber')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Serial Number'
                            />
                            {errors.serialNumber && (
                                <div className='text-sm text-red-600'>{errors.serialNumber.message}</div>
                            )}
                        </div>
                        <div className='mb-2'>
                            <textarea
                                {...register('description')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Description'
                            />
                        </div>
                        <div className='mb-2'>
                            <Controller
                                control={control}
                                name='tags'
                                render={({ field }: any) => (
                                    <select
                                        multiple
                                        className='w-full rounded border px-2 py-1'
                                        value={field.value || []}
                                        onChange={(e) => {
                                            const options = Array.from(e.target.selectedOptions).map(
                                                (opt) => opt.value
                                            );
                                            field.onChange(options);
                                        }}>
                                        {tagsList.map((tag) => (
                                            <option key={tag} value={tag}>
                                                {tag}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            <div className='text-xs text-gray-500'>Hold Ctrl/Cmd to select multiple tags</div>
                        </div>
                    </div>
                )}
                {step === 1 && (
                    <div>
                        <h2 className='mb-2 text-lg font-bold'>Media</h2>
                        <div className='mb-2'>
                            <input
                                type='file'
                                accept='image/*'
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                className='w-full rounded border px-2 py-1'
                            />
                            {imagePreview && <img src={imagePreview} alt='Preview' className='mt-2 max-h-40 rounded' />}
                        </div>
                        <div className='mb-2'>QR code (placeholder)</div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className='mb-2 text-lg font-bold'>Procurement</h2>
                        <div className='mb-2'>
                            <input
                                {...register('purchaseDate')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Purchase Date'
                                type='date'
                            />
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('purchaseCost')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Purchase Cost'
                                type='number'
                            />
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('supplier')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Supplier'
                            />
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('warrantyStart')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Warranty Start Date'
                                type='date'
                            />
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('warrantyEnd')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Warranty End Date'
                                type='date'
                            />
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className='mb-2 text-lg font-bold'>Usage</h2>
                        <div className='mb-2'>
                            <select {...register('meterType')} className='w-full rounded border px-2 py-1'>
                                <option value='Distance'>Distance</option>
                                <option value='Time'>Time</option>
                                <option value='Count'>Count</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <input
                                {...register('initialMeter')}
                                className='w-full rounded border px-2 py-1'
                                placeholder='Initial Meter Reading'
                                type='number'
                            />
                        </div>
                        <div className='mb-2'>
                            <select {...register('meterUnit')} className='w-full rounded border px-2 py-1'>
                                {meterUnits.map((unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <h2 className='mb-2 text-lg font-bold'>Custom Fields</h2>
                        {customFields.length === 0 ? (
                            <div className='mb-2 text-gray-500'>No custom fields for this category.</div>
                        ) : (
                            customFields.map((field) => (
                                <div className='mb-2' key={field}>
                                    <input
                                        className='w-full rounded border px-2 py-1'
                                        placeholder={field}
                                        value={getValues(`customFields.${field}`) || ''}
                                        onChange={(e) => setValue(`customFields.${field}`, e.target.value)}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                )}
                <div className='mt-4 flex gap-2'>
                    <button
                        type='button'
                        onClick={prev}
                        disabled={step === 0}
                        className='rounded bg-gray-200 px-3 py-1'>
                        Back
                    </button>
                    <button
                        type='button'
                        onClick={next}
                        disabled={step === steps.length - 1}
                        className='rounded bg-blue-600 px-3 py-1 text-white'>
                        Next
                    </button>
                    {step === steps.length - 1 && (
                        <button type='submit' className='rounded bg-green-600 px-3 py-1 text-white'>
                            Save
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
