'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProfileSettings: React.FC = () => <div>Profile Settings Content</div>;
const AccountSettings: React.FC = () => <div>Account Settings Content</div>;
const SecuritySettings: React.FC = () => <div>Security Settings Content</div>;

const Settings: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="flex space-x-4">
        {/* Navigation Menu */}
        <nav className="w-1/4">
          <ul className="space-y-4">
            <li>
              <Link href="/settings/profile" legacyBehavior>
                <a
                  className={`block px-4 py-2 text-lg font-medium rounded-lg hover:bg-blue-100 transition ${
                    pathname === '/settings/profile' ? 'bg-blue-200' : ''
                  }`}
                >
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/settings/account" legacyBehavior>
                <a
                  className={`block px-4 py-2 text-lg font-medium rounded-lg hover:bg-blue-100 transition ${
                    pathname === '/settings/account' ? 'bg-blue-200' : ''
                  }`}
                >
                  Account
                </a>
              </Link>
            </li>
            <li>
              <Link href="/settings/security" legacyBehavior>
                <a
                  className={`block px-4 py-2 text-lg font-medium rounded-lg hover:bg-blue-100 transition ${
                    pathname === '/settings/security' ? 'bg-blue-200' : ''
                  }`}
                >
                  Security
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="w-3/4 bg-gray-50 p-6 rounded-lg shadow-inner">
          {/* Render subcomponents based on routes */}
          {pathname === '/settings/profile' && <ProfileSettings />}
          {pathname === '/settings/account' && <AccountSettings />}
          {pathname === '/settings/security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
