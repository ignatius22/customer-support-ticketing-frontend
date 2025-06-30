import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_REMINDER_SETTINGS } from '../../graphql/mutations';
import { GET_REMINDER_SETTINGS } from '../../graphql/queries';

const ReminderSettings = () => {
  const [enabled, setEnabled] = useState(true);
  const [time, setTime] = useState('09:00');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data, loading: loadingSettings } = useQuery(GET_REMINDER_SETTINGS);
  
  const [updateSettings, { loading: updating }] = useMutation(UPDATE_REMINDER_SETTINGS, {
    onCompleted: () => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Initialize form with current settings when data is loaded
  useEffect(() => {
    if (data?.reminderSettings) {
      setEnabled(data.reminderSettings.enabled);
      setTime(data.reminderSettings.time);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await updateSettings({
        variables: {
          input: {
            enabled,
            time,
          },
        },
      });
    } catch (err) {
      // Error handled by onError callback
      console.error('Failed to update reminder settings:', err);
    }
  };

  if (loadingSettings) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Daily Reminder Settings</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enabled"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enabled" className="ml-2 block text-sm text-gray-900">
            Enable daily reminder emails
          </label>
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          <p className="mt-1 text-sm text-gray-500">
            Choose when you'd like to receive the daily reminder email
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {updating ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">About Daily Reminders</h3>
        <p className="text-sm text-gray-500">
          Daily reminders include:
        </p>
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>List of all open tickets</li>
          <li>Tickets requiring immediate attention</li>
          <li>Tickets that haven't been updated in the last 24 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default ReminderSettings;
