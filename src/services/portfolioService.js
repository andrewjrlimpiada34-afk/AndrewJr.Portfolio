import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";

function ensureFirebase() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured.");
  }
}

async function getContentDoc(docId) {
  ensureFirebase();
  const snapshot = await getDoc(doc(db, "siteContent", docId));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function getHomeContent() {
  return getContentDoc("home");
}

export async function getAboutContent() {
  return getContentDoc("about");
}

export async function getSettings() {
  return getContentDoc("settings");
}

export async function saveHomeContent(payload) {
  ensureFirebase();
  await setDoc(doc(db, "siteContent", "home"), payload, { merge: true });
}

export async function saveAboutContent(payload) {
  ensureFirebase();
  await setDoc(doc(db, "siteContent", "about"), payload, { merge: true });
}

export async function saveSettings(payload) {
  ensureFirebase();
  await setDoc(doc(db, "siteContent", "settings"), payload, { merge: true });
}

export async function getProjects() {
  ensureFirebase();
  const snapshot = await getDocs(query(collection(db, "projects"), orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createProject(payload) {
  ensureFirebase();
  await addDoc(collection(db, "projects"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function updateProject(id, payload) {
  ensureFirebase();
  await updateDoc(doc(db, "projects", id), payload);
}

export async function deleteProject(id) {
  ensureFirebase();
  await deleteDoc(doc(db, "projects", id));
}

export async function getCertificates() {
  ensureFirebase();
  const snapshot = await getDocs(
    query(collection(db, "certificates"), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createCertificate(payload) {
  ensureFirebase();
  await addDoc(collection(db, "certificates"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function updateCertificate(id, payload) {
  ensureFirebase();
  await updateDoc(doc(db, "certificates", id), payload);
}

export async function deleteCertificate(id) {
  ensureFirebase();
  await deleteDoc(doc(db, "certificates", id));
}
