import { createContext, useContext, useState, ReactNode } from 'react';

export interface Profile {
  id?: string;
  name: string;
  email: string;
  gradeLevel?: number;
  isTutor?: boolean;
}

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signUp: (email: string, name: string, gradeLevel?: number) => Promise<void>;
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, name: string, gradeLevel?: number) => {
    setLoading(true);
    // Simulate signup delay
    await new Promise((r) => setTimeout(r, 500));
    setUser({ name, email, gradeLevel });
    setLoading(false);
  };

  const signIn = async (email: string) => {
    setLoading(true);
    // Simulate login delay
    await new Promise((r) => setTimeout(r, 500));
    setUser({ name: 'Demo User', email });
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
