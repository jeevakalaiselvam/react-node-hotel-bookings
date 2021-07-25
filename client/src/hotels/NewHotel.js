import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import AlgoliaPlaces from "algolia-places-react";
import { log } from "../util/log";

//Algolia config
const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  countries: ["au"],
};

const NewHotel = () => {
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  //Destructuring states
  const { title, content, location, image, price, from, to, bed } = values;

  //Handle Image upload
  const handleImageChange = (e) => {
    //Update chosen image in state and show the object in a preview image holder
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Handle for form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-secondary btn-block m-2 text-left'>
          Upload Image
          <input
            type='file'
            name='image'
            onChange={handleImageChange}
            accept='image/*'
            hidden
          />
        </label>

        <input
          type='text'
          name='title'
          autoComplete='off'
          onChange={handleChange}
          placeholder='Title'
          className='form-control m-2'
          value={title}
        />

        <textarea
          name='content'
          autoComplete='off'
          onChange={handleChange}
          placeholder='Content'
          className='form-control m-2'
          value={content}
        />

        <AlgoliaPlaces
          className='form-control ml-2 mr-2'
          placeholder='Location'
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) =>
            setValues({ ...values, location: suggestion.value })
          }
          style={{ height: "50px" }}
        />

        <input
          type='number'
          name='price'
          autoComplete='off'
          onChange={handleChange}
          placeholder='Price'
          className='form-control m-2'
          value={price}
        />

        <input
          type='number'
          name='bed'
          autoComplete='off'
          onChange={handleChange}
          placeholder='Beds'
          className='form-control m-2'
          value={bed}
        />

        <button className='btn btn-outline-primary m-2'>Save</button>
      </div>
    </form>
  );

  return (
    <>
      <pre>{JSON.stringify(values)}</pre>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2>Add Hotel</h2>
      </div>
      <div className='container-fluid p-2'>
        <div className='row'>
          <div className='col-md-10'>
            <br />
            {hotelForm()}
          </div>
          <div className='col-md-2'>
            <img src={preview} alt='Previre' className='img img-fluid m-2' />
          </div>
        </div>
        <h2>Add Hotel</h2>
      </div>
    </>
  );
};

export default NewHotel;
