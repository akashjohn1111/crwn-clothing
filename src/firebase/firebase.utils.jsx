import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAk2_P-E8-5htFkZejUrDI768QPOjE9PaI",
    authDomain: "crown-db-a3da8.firebaseapp.com",
    databaseURL: "https://crown-db-a3da8.firebaseio.com",
    projectId: "crown-db-a3da8",
    storageBucket: "crown-db-a3da8.appspot.com",
    messagingSenderId: "775876855110",
    appId: "1:775876855110:web:bec14d3fa285b750d25147",
    measurementId: "G-3QD1V11ZNX"
  };

export const createUserProfileDocument=async(userAuth,additionalData)=>{
if(!userAuth) return;

const userRef=firestore.doc(`users/${userAuth.uid}`);
const snapshot=await userRef.get();


if(!snapshot.exists) {
const {displayName, email}=userAuth;
const createdAt=new Date();

try{
await userRef.set({
  displayName,
  email,
  createdAt,
  ...additionalData
})
} catch(error){
console.log('error creating user', error.message);
}
}
return userRef;

};




firebase.initializeApp(config);

export const addCollectionsAndDocuments =async(collectionKey,objectsToAdd)=>{
const collectionRef = firestore.collection(collectionKey);   
const batch = firestore.batch();
objectsToAdd.forEach(obj => {
  const newDocRef = collectionRef.doc();
  batch.set(newDocRef,obj);
  
});
return await batch.commit();
};


export const convertCollectionsSnapshotToMap =(collections)=>{
  const transformedCollection = collections.docs.map(doc=>{
    const {title,items} = doc.data();
    return{
      routeName:encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator,collection)=>{
    accumulator[collection.title.toLowerCase()]=collection;
    return accumulator;},{});
  
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;