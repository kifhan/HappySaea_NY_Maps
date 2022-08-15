import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, setDoc, deleteDoc, orderBy, query } from 'firebase/firestore/lite';
import {} from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {firebaseConfig} from "../firebase.config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const authService = getAuth();
export const storageService = getStorage();

export const getVideos = async () => {
  const videosCol = collection(db, 'videos');
  const videoQuery = query(videosCol, orderBy("createdAt", "desc"));
  const videoSnapshot = await getDocs(videoQuery);
  const videoList = videoSnapshot.docs.map(doc => doc.data());
  return videoList;
}

export const getVideo = async (id) => {
    const docRef = doc(db, "videos", id);
    const docSnap = await getDoc(docRef);
    const video = docSnap.data();
    return video;
}

export const createVideo = async (videoId, videoData) => {
    const docRef = doc(db, "videos", videoId);
    await setDoc(docRef, videoData);
    console.log("video data added at:", docRef.id);
    return docRef;
}

export const updateVideo = async (videoId, videoData) => {
    const docRef = doc(db, "videos", videoId);
    await updateDoc(docRef, videoData);
    console.log("video data updated at:", docRef.id);
    return docRef;
}

export const deleteVideo = async (videoId) => {
    const docRef = doc(db, "videos", videoId);
    await deleteDoc(docRef);
    console.log("video data deleted at:", videoId);
    return docRef;
}

export const getMarkers = async (videoId) => {
    const markersCol = collection(db, "videos", videoId, 'markerComments');
    const markerSnapshot = await getDocs(markersCol);
    const markerList = markerSnapshot.docs.map(doc => {
        const marker = doc.data();
        marker.id = doc.id;
        return marker;
    });
    return markerList;
}

export const getMarker = async (videoId, markerId) => {
    const markerCol = collection(db, "videos", videoId, 'markerComments');
    const markerRef = doc(markerCol, markerId);
    const markerSnap = await getDoc(markerRef);
    const marker = markerSnap.data();
    return marker;
}

export const createMarker = async (videoId, markerData) => {
    const markerCol = collection(db, "videos", videoId, 'markerComments');
    const markerRef = await addDoc(markerCol, markerData);
    console.log("marker data added at:", markerRef.id);
    return markerRef;
}

export const updateMarker = async (videoId, markerId, markerData) => {
    const markerCol = collection(db, "videos", videoId, 'markerComments');
    const markerRef = doc(markerCol, markerId);
    await updateDoc(markerRef, markerData);
    console.log("marker data updated at:", markerRef.id);
    return markerRef;
}

export const deleteMarker = async (videoId, markerId) => {
    const markerCol = collection(db, "videos", videoId, 'markerComments');
    const markerRef = doc(markerCol, markerId);
    await deleteDoc(markerRef);
    console.log("marker data deleted at:", markerId);
    return markerRef;
}