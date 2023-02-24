import { useContext, useEffect, useState } from "react";
import { getPositions, getToken, getUsers, postUser } from "usersAPI/usersAPI";
import { PostFormik } from "../PostFormik/PostFormik";
import loader from 'img/loader.png';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { context } from "context/context";

export const PostRequest = () => {
   const [positions, setPositions] = useState([]);
   const [status, setStatus] = useState('idle');
   const [err, setErr] = useState(null);
   const [saveToken, setSaveToken] = useState(null);
   const [formData, setFormData] = useState(null);
   const [success, setSuccess] = useState(null);
   const ctx = useContext(context);

   const data = (value) => {
      setFormData(value);
   };

   useEffect(() => {
      async function searchPositionsAndToken() {
         setStatus('pending');
         try {
            const response = await getPositions();
            const { token } = await getToken();
            setPositions(response.positions);
            setSaveToken(token);
            setStatus('resolve');
         } catch (err) {
            setErr(err.response.data.message);
            setStatus('rejected');
         };
      };

      searchPositionsAndToken();
   }, [])

   useEffect(() => {

      setSuccess(null);

      if (!formData) {
         return
      };

      async function postRequestUser(formData, saveToken,) {
         setStatus('pending');
         try {
            const { success } = await postUser(formData, saveToken);
            const response = await getUsers();
            ctx.getTotalUsers(response.total_users);
            setSuccess(success);
            ctx.pageNull();
            setFormData(null);
            setStatus('resolve');
         } catch (err) {
            setErr(err.response.data.message);
            setSuccess(false);
            ctx.pageNull();
            setFormData(null);
            setStatus('badRequest');
         };
      };

      postRequestUser(formData, saveToken);
   }, [ctx, formData, saveToken]);


   if (status === 'pending') {
      return <div className="request-pending">
         <img className="request-pending__image" src={loader} alt="loader" /></div>
   };

   if (status === 'rejected') {
      return <div className="request-rejected">{err}</div>
   };

   if (status === 'resolve' || status === 'badRequest') {
      return (
         <>
            {success ? Report.success(
               'Success Request',
               `User successfully registered`,
               'Okay') : null}
            {success === false ? Report.failure(
               'Bad Request',
               `${err} <br/><br/>`,
               'Okay',
            ) : null}
            <section className="post-request">
               <div className="post-request__container">
                  <div className="post-request__body">
                     <h2 className="post-request__title title">Working with POST request</h2>
                     <PostFormik status={status} err={err} positions={positions} data={data} />
                  </div>
               </div>
            </section>
         </>
      );
   };
};