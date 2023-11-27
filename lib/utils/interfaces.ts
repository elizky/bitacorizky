import { UserCredential } from 'firebase/auth';
import { HTMLInputTypeAttribute } from 'react';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthContextType {
  currentUser: any;
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<{ result: UserCredential | null; error: unknown }>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
}

export interface WriteProps {
  authorId: string;
  content: any;
  id: string;
  image: string;
  location: { lat: number; lng: number };
  publishAt: string;
  title: string;
}

export interface InputProp {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value: any;
  required?: boolean;
  onChange: (e: any) => void;
}

export interface LoginButtonProps {
  type: 'submit' | 'button' | undefined;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}

export interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}
export interface ErrorsProps {
  email?: string;
  password?: string;
  firebase?: string;
}

export interface Mark {
  type: string;
}

export interface TextElement {
  type: string;
  text?: string;
  marks?: Mark[];
  content?: TextElement[];
}

export interface Content {
  type: string;
  content: TextElement[];
}

export interface ErrorLoginText {
  emailEmpty: string;
  emailFormat: string;
  passwordError: string;
  passwordValidate: string;
  firebaseUser: string;
  firebasePassword: string;
}
export interface ErrorWriteText {
  contentError: string;
  titleError: string;
  paragraphError: string;
}
