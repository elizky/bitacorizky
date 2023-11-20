import { collection, doc, addDoc, getDocs, query, where, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { database, storage } from './firebaseConfig';
import { WriteProps } from '../utils/interfaces';

export const getWrites = async (userId: string): Promise<WriteProps[]> => {
  const writesRef = collection(database, 'writes');
  const q = query(writesRef, where('authorId', '==', userId));
  const writesSnapshot = await getDocs(q);
  const writes = writesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as WriteProps));
  return writes;
};

export const getWrite = async (writeId: any): Promise<WriteProps> => {
  const writeDocRef = doc(database, 'writes', writeId);
  const writeDocSnapshot = await getDoc(writeDocRef);

  const writeData = writeDocSnapshot.data() as WriteProps;

  return writeData;
};

export const addWrite = async (write: any) => {
  const writesRef = collection(database, 'writes');
  const newWriteRef = await addDoc(writesRef, write);
  return newWriteRef.id;
};

export const addSuggestion = async (suggestion: any) => {
  const suggestionRef = collection(database, 'suggestions');
  const newSuggestionRef = await addDoc(suggestionRef, suggestion);
  return newSuggestionRef;
};

export const uploadImage = async (file: File, userId: string) => {
  const storageRef = ref(storage, `${file.name}-${userId}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
