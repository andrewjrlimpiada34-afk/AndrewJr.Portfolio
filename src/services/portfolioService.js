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
    throw new Error("Firebase is not configured. Please check your environment variables.");
  }
}

// Helper function for user-friendly error messages
function getUserFriendlyError(error, defaultMessage) {
  if (error?.code === "permission-denied") {
    return "Access denied. Please check your Firestore security rules.";
  }
  if (error?.code === "unavailable") {
    return "Service temporarily unavailable. Please try again later.";
  }
  if (error?.code === "unauthenticated") {
    return "Authentication required. Please log in again.";
  }
  if (error?.message?.includes("network")) {
    return "Network error. Please check your connection.";
  }
  return error?.message || defaultMessage;
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
  try {
    ensureFirebase();
    await setDoc(doc(db, "siteContent", "home"), payload, { merge: true });
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to save home content."));
  }
}

export async function saveAboutContent(payload) {
  try {
    ensureFirebase();
    await setDoc(doc(db, "siteContent", "about"), payload, { merge: true });
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to save about content."));
  }
}

export async function saveSettings(payload) {
  try {
    ensureFirebase();
    await setDoc(doc(db, "siteContent", "settings"), payload, { merge: true });
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to save settings."));
  }
}

export async function getProjects() {
  ensureFirebase();
  const snapshot = await getDocs(query(collection(db, "projects"), orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createProject(payload) {
  try {
    ensureFirebase();
    await addDoc(collection(db, "projects"), {
      ...payload,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to create project."));
  }
}

export async function updateProject(id, payload) {
  try {
    ensureFirebase();
    await updateDoc(doc(db, "projects", id), payload);
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to update project."));
  }
}

export async function deleteProject(id) {
  try {
    ensureFirebase();
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to delete project."));
  }
}

export async function getCertificates() {
  ensureFirebase();
  const snapshot = await getDocs(
    query(collection(db, "certificates"), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createCertificate(payload) {
  try {
    ensureFirebase();
    await addDoc(collection(db, "certificates"), {
      ...payload,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to create certificate."));
  }
}

export async function updateCertificate(id, payload) {
  try {
    ensureFirebase();
    await updateDoc(doc(db, "certificates", id), payload);
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to update certificate."));
  }
}

export async function deleteCertificate(id) {
  try {
    ensureFirebase();
    await deleteDoc(doc(db, "certificates", id));
  } catch (error) {
    throw new Error(getUserFriendlyError(error, "Failed to delete certificate."));
  }
}
