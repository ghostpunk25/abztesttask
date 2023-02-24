import { useContext, useEffect, useState } from "react";
import { getUsers } from "usersAPI/usersAPI";
import defaultPhoto from "img/getRequest/photo-cover.svg";
import loader from '../../img/loader.png';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { context } from "context/context";
import { number } from "yup";

export const GetRequest = () => {
   const [users, setUsers] = useState([]);
   const [status, setStatus] = useState('idle');
   const [err, setErr] = useState(null);
   const [totalPages, setTotalPages] = useState(null);
   const ctx = useContext(context);

   useEffect(() => {
      async function searchUsres(page) {
         setStatus('pending');
         try {
            const response = await getUsers(page);
            if (ctx.page === 1) {
               setUsers(response.users.sort((first, last) => last.registration_timestamp - first.registration_timestamp));
            } else {
               setUsers(prevState => [...prevState, ...response.users]);
            }
            setTotalPages(response.total_pages);
            setStatus('resolve');
         } catch (err) {
            setErr(err.response.data.message);
            setStatus('rejected');
         };
      };

      searchUsres(ctx.page);
   }, [ctx, ctx.page]);

   const handleShowMore = (e) => {
      e.preventDefault();
      ctx.getPage();
   };

   if (status === 'pending') {
      return <div className="request-pending">
         <img className="request-pending__image" src={loader} alt="loader" /></div>
   };

   if (status === 'rejected') {
      return <div className="request-rejected">{err}</div>
   };

   if (status === 'resolve') {
      return (
         <section className="get-request">
            <div className="get-request__container">
               <div className="get-request__body">
                  <h2 className="get-request__title title">Working with GET request</h2>
                  <div className="get-request__cards">
                     {users.map(({ id, name, email, phone, position, photo = defaultPhoto }) => (
                        <article className="get-request__card card-user" key={id}>
                           <div className="card-user__photo">
                              {(photo.split('').slice(-4).join('') === '.jpg' || photo.split('').slice(-5).join('') === '.jpeg')
                                 ? <img className="card-user__img" src={photo} alt={name} />
                                 : <img className="card-user__img" src={defaultPhoto} alt={name} />}
                           </div>
                           <div className="card-user__name">{name}</div>
                           <div className="card-user__position">{position}</div>
                           <div id={id} className="card-user__email">{email}</div>
                           <Tooltip anchorId={id} content={email} place="bottom" />
                           <div className="card-user__phone">{phone}</div>
                        </article>
                     ))}
                  </div>
                  {totalPages === ctx.page ? null : <button onClick={handleShowMore} className="get-request__button btn" type="button">Show more</button>}
               </div>
            </div>
         </section>
      );
   };
};