import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { IMaskInput } from 'react-imask';

const validationSchema = yup.object().shape({
   name: yup.string('').min(2).required(' '),
   email: yup.string('').email('').required(' '),
   phone: yup.number('').required(' '),
   position_id: yup.mixed('').required(' '),
   photo: yup.mixed('').required(' '),
});

export const PostFormik = ({ positions, data }) => {

   const formik = useFormik({
      initialValues: {
         name: '',
         email: '',
         phone: '',
         position_id: '',
         photo: '',
      },
      validationSchema,
      onSubmit: values => {
         data(values);
         formik.resetForm();
      }
   });

   return (
      <form className='post-formik' onSubmit={formik.handleSubmit}>
         <div className='post-formik__item'>
            <input
               className={!formik.errors.name ? 'post-formik__input' : 'post-formik__input post-formik__input_error'}
               id="name"
               name="name"
               type="text"
               placeholder=" "
               autoComplete="off"
               onChange={formik.handleChange}
               value={formik.values.name}
            />
            <label htmlFor="name" className={!formik.errors.name ? 'post-formik__placeholder' : 'post-formik__placeholder post-formik__placeholder_error'}>Your name</label>
            {formik.errors.name ? <div className='post-formik__error-input'>Enter name</div> : null}
         </div>
         <div className='post-formik__item'>
            <input
               className={!formik.errors.email ? 'post-formik__input' : 'post-formik__input post-formik__input_error'}
               id="email"
               name="email"
               type="email"
               placeholder=" "
               autoComplete="off"
               onChange={formik.handleChange}
               value={formik.values.email}
            />
            <label htmlFor="name" className={!formik.errors.email ? 'post-formik__placeholder' : 'post-formik__placeholder post-formik__placeholder_error'}>Email</label>
            {formik.errors.email ? <div className='post-formik__error-input'>Enter email</div> : null}
         </div>
         <div className='post-formik__item'>
            <IMaskInput
               mask='+{38}0000000000'
               radix="."
               overwrite
               className={!formik.errors.phone ? 'post-formik__input' : 'post-formik__input post-formik__input_error'}
               id="phone"
               name="phone"
               type="tel"
               placeholder=" "
               autoComplete="off"
               onChange={formik.handleChange}
               value={formik.values.phone}
            />
            <label htmlFor="name" className={!formik.errors.phone ? 'post-formik__placeholder' : 'post-formik__placeholder post-formik__placeholder_error'}>Phone</label>
            {formik.errors.phone ? <div className='post-formik__error-input'>+38 (XXX) XXX-XX-XX</div> : null}
         </div>
         <div className="post-formik__box">
            <p className='post-formik__text'>Select your position</p>
            {positions?.map(({ name, id }) => (
               <label htmlFor={name} className='post-formik__label' key={name}>
                  <input
                     className='post-formik__radio'
                     id={name}
                     name="position_id"
                     value={id}
                     type="radio"
                     onChange={formik.handleChange}
                  />
                  <span className={!formik.errors.position_id ? 'post-formik__custom-radio' : 'post-formik__custom-radio post-formik__custom-radio_error'}></span>
                  {name}
               </label>
            ))}
            {formik.errors.position_id ? <div className='post-formik__radio-error'>Must choose</div> : null}
         </div>
         <div className='post-formik__block'>
            <label className={!formik.errors.photo ? 'post-formik__upload' : 'post-formik__upload post-formik__upload_error'} htmlFor="file">
               <input id='file' accept='.jpg, .jpeg' className='post-formik__file' type="file" name='photo' onChange={(e) => formik.setFieldValue('photo', e.target.files[0])} />
               <span className={!formik.errors.photo ? 'post-formik__custom-file' : 'post-formik__custom-file post-formik__custom-file_error'}>Upload</span>
               {!formik.values.photo?.name ? 'Upload your photo' : <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{formik.values.photo.name}</span>}
            </label>
            {formik.errors.photo ? <div className='post-formik__file-error'>Must be jpg/jpeg, 70x70px, max size 5MB</div> : null}
         </div>
         {!(formik.isValid && formik.dirty) ? <button disabled={!(formik.isValid && formik.dirty)} className='post-formik__button post-formik__button_disabled btn' type="submit">Submit</button> : <button disabled={!(formik.isValid && formik.dirty)} className='post-formik__button btn' type="submit">Submit</button>}
      </form >
   );
};