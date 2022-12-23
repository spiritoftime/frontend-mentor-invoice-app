import { useSelector } from "react-redux";
import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  collection,
  document,
} from "firebase/firestore";
import { database } from "../../firestore";
// check if there is a document created for the user, if there is not
// then create new document
const useCreateUserDocument = async () => {
  const userUID = useSelector((state) => state.Login.uid);
  const docSnap = await getDoc(doc(database, "users", userUID));

  if (!docSnap.exists()) {
    await setDoc(doc(database, "users", userUID), {});

    // await setDoc(doc(database, "users", userUID), {});
  }
};

export default useCreateUserDocument;
