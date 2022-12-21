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
