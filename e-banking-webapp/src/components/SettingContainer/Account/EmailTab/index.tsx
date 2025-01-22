'use client';

import { useEffect, useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Checkbox } from '@nextui-org/react';

// Interfaces
import { Preferences, TEXT_VARIANT } from '@/interfaces';

// Constants
import { PREFERENCES } from '@/constants';

// Hooks
import { useConfirmationOnLeave } from '@/hooks';

// Components
import { Button, Text } from '@/components/common';

interface EmailTabProps {
  announcements?: boolean;
  updates?: boolean;
  feedbacksAndSurvey?: boolean;
  events?: boolean;
  generalNotification?: boolean;
  promotions?: boolean;
  eventsNearMe?: boolean;
  onSubmit: (data: Preferences) => void;
  onUnsavedChanges: (hasUnsavedChanges: boolean) => void;
}

export const EmailTab = ({
  announcements = false,
  updates = false,
  feedbacksAndSurvey = false,
  events = false,
  generalNotification = false,
  promotions = false,
  eventsNearMe = false,
  onSubmit,
  onUnsavedChanges,
}: EmailTabProps) => {
  const defaultValues = {
    announcements,
    updates,
    feedbacksAndSurvey,
    events,
    generalNotification,
    promotions,
    eventsNearMe,
  };

  const {
    control,
    handleSubmit: submitForm,
    reset,
    formState: { isSubmitting },
  } = useForm<Preferences>({
    defaultValues,
  });

  const watchedValues = useWatch({
    control,
  });

  const hasChanges = useMemo(
    () =>
      Object.keys(watchedValues).some(
        (key) =>
          watchedValues[key as keyof Preferences] !==
          defaultValues[key as keyof Preferences],
      ),
    [defaultValues, watchedValues],
  );

  useEffect(() => {
    onUnsavedChanges?.(hasChanges);
  }, [hasChanges, onUnsavedChanges]);

  useConfirmationOnLeave(hasChanges);

  const isDisabled = !hasChanges || isSubmitting;

  const handleSubmit = (data: Preferences) => {
    onSubmit(data);
  };

  const handleUnsubscribeAll = () => {
    reset({
      announcements: false,
      updates: false,
      feedbacksAndSurvey: false,
      events: false,
      generalNotification: false,
      promotions: false,
      eventsNearMe: false,
    });
  };

  return (
    <form className='space-y-5' onSubmit={submitForm(handleSubmit)}>
      <div className='flex flex-col gap-2.5 pb-[22px]'>
        <Text as='span' className='text-sm font-semibold text-navyBlue'>
          Email/ Notification Settings
        </Text>

        <Text
          variant={TEXT_VARIANT.DEFAULT}
          as='span'
          className='mt-[5px] text-[13px] font-normal'
        >
          Your connected App, socials and Accounts will appear here.
        </Text>
      </div>

      <ul className='flex flex-col gap-4 pb-[58px]'>
        {PREFERENCES.map(({ label, key }) => (
          <Controller
            key={key}
            name={key as keyof Preferences}
            control={control}
            render={({ field }) => (
              <li key={key}>
                <Checkbox
                  id={key}
                  isSelected={field.value}
                  onChange={(isChecked) => field.onChange(isChecked)}
                  classNames={{
                    label: 'text-xs text-foreground-100',
                    wrapper: 'after:bg-primary-200',
                  }}
                >
                  {label}
                </Checkbox>
              </li>
            )}
          />
        ))}
      </ul>

      <div className='flex w-full max-w-[680px] flex-col items-start gap-4'>
        <Button
          color='navyBlue'
          radius='xs'
          type='submit'
          isDisabled={isDisabled}
          className='[&[data-loading=true]_.flex]:h-6 [&[data-loading=true]_.flex]:w-6'
          isLoading={isSubmitting}
          data-testId='update-email-preferences'
        >
          Update Email Preferences
        </Button>

        <Button
          onClick={handleUnsubscribeAll}
          type='button'
          color='outline'
          className='h-auto w-auto p-0 text-xs text-foreground-300 underline hover:text-primary-200'
        >
          Unsubscribe from all
        </Button>
      </div>
    </form>
  );
};
