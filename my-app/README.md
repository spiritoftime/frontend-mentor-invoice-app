# frontend-mentor-invoice-app

what i learnt:
(1) async functions should go inside a useEffect. We need to make the async function a named function inside of useEffect then call it, so that the return function that useEffect expects can be called (if needed)
see https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

(2) Redux is not able to take in non-serializable data (ie. date object from firebase). It is necessary to convert it to a date first before dispatching it into the store.

(3) In js, empty arrays ARE TRUTHY!!
![Capture](https://user-images.githubusercontent.com/98036884/208433326-11e73107-d414-44b0-9613-54899a50ffa7.PNG)

wasted 2hours because i used if(filteredInvoices). This may have worked in python but in js empty arrays are truthy.

(4) Most difficult thing i encountered in this project: trying to get register to output the whole form input as a nested object. As per the image below, i needed to have nested objects for every itemArticle, so that i know which name, total, price and qty is for which. I had serious difficulty trying to google whatever i needed because i could not think of the right phrasing, which led to me wasting quite a significant amount of time. In the end, i aimlessly browsed the documentation for React Hook form and stumbled upon https://react-hook-form.com/api/useform/register#registerRef, which allowed me to output it according to what i want.

Problem: ![documentation](https://user-images.githubusercontent.com/98036884/208931108-b3ed4e53-9be2-45b9-ada5-679d33af4908.PNG)
As you can see, i could not get all the data written on each itemArticle

![image](https://user-images.githubusercontent.com/98036884/208927135-360241f4-d673-458e-b61f-f848a3c76427.png)

(5) Significant challenge #2: How to create document with empty subcollection
Problem Description: So i basically want to do the exact same thing like https://stackoverflow.com/questions/62095883/how-to-create-document-with-subcollection, but with v9.

The closest solution i've tried to find was https://stackoverflow.com/questions/70551249/firebase-v9-add-subcollection-to-existing-doc, but that is for existing documents.

What i've tried: i know that in order to create a document with a specific id that i want, i would need to use setDoc. However, im having trouble figuring out how to somehow create a subcollection inside of this new userUID document that i would like to create. Could anyone point me in the right direction? thank you!

await setDoc(doc(database, "users", userUID), {});

My thought process was that if the user is new, i wanted to create an empty document (that has the id corresponding to its userUID) with a subcollection called 'invoices'. After that, when the user eventually adds his first invoice, i can then add each invoice in the form of documents into this subcollection.

The empty subcollection is also necessary so that when the new user is redirected into the invoices page after signing in, i could use onSnapShot to check if there is any invoices. if there is none, i could display some picture and show that there is no invoices

visualisation as follows:

- user document

  - invoices (empty at first)

    - invoice 1

    - invoice 2

edit: so apparently you can have a collectionRef that has not been created! so in my case, i could simply have const collectionRef = collection(database, "users", uid, "invoices");

onsnapshot would have returned an empty array, and i could still achieve what i want!

When i need to add a new invoice, i could just do addDoc(collectionRef, invoiceObj);

(6) How to fix relative links when deploying to gitpages
at app.js, i had to add /frontend-mentor-invoice-app/ to the first page. i realised that subsequent routes were also screwed.
any way to fix this without having to manually add all the routes?
EDIT: at browserRouter, add the basename to be equal to the relative path (in this case frontend-mentor-invoice-app).
