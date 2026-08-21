import { systemColors } from '../data/systemColors';
import { Wordmark } from '../components/Wordmark';
import { SignInButton } from '../components/SignInButton';
import { PersonalFlavorFingerprint } from '../components/PersonalFlavorFingerprint';
import { AccountPanel } from '../components/AccountPanel';

export function Profile() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.surface, borderBottom: `1px solid ${systemColors.border}` }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="mb-2 flex items-start justify-between gap-3">
            <Wordmark className="text-2xl" />
            <SignInButton />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: systemColors.navy }}>
            My Taste Profile
          </h1>
          <p className="mt-1" style={{ color: systemColors.navyMuted }}>
            Your palate, learned from the dishes you log
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <PersonalFlavorFingerprint embedded />
        </div>
        <AccountPanel />
      </main>
    </div>
  );
}
