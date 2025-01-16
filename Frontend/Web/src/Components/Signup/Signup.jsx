import { useState, useEffect } from 'react';
import style from './Signup.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import s3 from 'react-aws-s3-typescript'
import Logo from '../../assets/logo.png'



function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: '',
    password: '',
    role: '',
    gender: '',
    city: '',
    dateOfBirth: '',
    career: '',
    careerCategory: '',
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    verificationCode: '',
    experience: '',
    profileImage: "",
    coordinates: [null, null],
    sendProficientRequests: ['674f0eee59fa49413982b509'],
    receiveProficientRequest: ['674f0eee59fa49413982b509'],
    resetCode: 0,
    resetCodeExpires: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude + "," + longitude);
          setUser((prev) => ({
            ...prev,
            coordinates: [latitude.toString(), longitude.toString()],
          }));
        },
        (error) => {
          console.log('Error retrieving geolocation: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);


  const [emails, setEmails] = useState([]);
  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const [usernames, setUsernames] = useState([]);
  const [usernameExist, setUsernameExist] = useState(false);




  useEffect(() => {
    const fetchEmails = async () => {
      try {

        const response = await axios.get(`${import.meta.env.VITE_API}/auth/emails`);
        setEmails(response.data);
      } catch (error) {
        console.log('Error fetching emails: ', error);
      }
    };
    fetchEmails();
  }, []);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {

        const responseUsers = await axios.get(`${import.meta.env.VITE_API}/auth/usernames`);
        setUsernames(responseUsers.data);
      } catch (error) {
        console.log('Error fetching Usernames: ', error);
      }
    };
    fetchUsernames();
  }, []);




  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (name === 'coordinates[0]' || name === 'coordinates[1]') {
      setUser((prev) => ({
        ...prev,
        coordinates: name === 'coordinates[0]' ? [value, prev.coordinates[1]] : [prev.coordinates[0], value],
      }));
    }
    if (name === 'email') {
      setUser((prev) => ({
        ...prev,
        email: value,
      }));
      const emailExists = emails.some((email) => email.email === value);
      setEmailExists(emailExists);
      if (emailExists) {
        setErrorMessage('This email is already registered.');
      } else {
        setErrorMessage('');
      }
    }

    if (name === 'username') {
      setUser((prev) => ({ ...prev, username: value }));
      const usernameExist = usernames.some((username) => username.username === value);
      setUsernameExist(usernameExist);
    }




    else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [image, setImage] = useState(null);


  const handleFileChange = async (event) => {
    setImage(event.target.files[0]);


  };

  let imgURL = ''

  const handleUpload = async () => {
    const Reacts3Client = new s3({
      accessKeyId: "AKIA5MSUBQC3OE6ZOF4Z",
      secretAccessKey: "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",
      bucketName: "career-images-s3",
      dirName: "media",
      region: "eu-north-1",
      s3Url: "https://career-images-s3.s3.eu-north-1.amazonaws.com",
    });

    try {
      const data = await Reacts3Client.uploadFile(image);
      imgURL = data.location;

      console.log("imgURL: ", imgURL)

    } catch (err) {
      console.error("Error uploading image: ", err);
      throw err;
    }
  };






  const notifySuccess = () => {
    toast.success('Successfully registered!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };


  const sendVerificationCode = async (email) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    user.verificationCode = code;
    setUser((prev) => ({
      ...prev,
      verificationCode: code,
    }));


    try {
      await axios.post(`${import.meta.env.VITE_API}/send/send-verification`, { email, code });
      toast.info('Verification code sent to your email!', { position: "top-right" });
      console.log(code)



    } catch (error) {
      console.error('Error sending verification code:', error.response?.data || error.message);
      toast.error('Failed to send verification code.');
    }
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpload();

    }
    catch (error) {
      console.log("Error upload imageSubmit: ", error)
    }

    if (user.password.toLowerCase().includes('password')) {
      alert('Password must not contain the word "password".');
      return;
    }


    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', 'user');
    formData.append('gender', user.gender);
    formData.append('city', user.city);
    formData.append('dateOfBirth', user.dateOfBirth);
    formData.append('careerCategory', user.careerCategory);
    formData.append('profile[firstName]', user.firstName);
    formData.append('profile[lastName]', user.lastName);
    formData.append('profile[phone]', user.phone);
    formData.append('profile[bio]', '');
    formData.append('profile[experience]', user.experience);

    formData.append('profile[profileImage]', "https://placehold.co/400");

    formData.append('profile[location][type]', "Point");

    // if (user.profileImage) {
    //   formData.append('profile[profileImage]', user.profileImage);
    // }
    // else{
    //   console.log("Error upload image")
    //   return;
    // }


    formData.append('profile[location][coordinates][0]', user.coordinates[0]);
    formData.append('profile[location][coordinates][1]', user.coordinates[1]);


    formData.append('friendRequests[0]', '5f9a8b8f8c8d8e8b8f8a8b8c');
    formData.append('friends[0]', '5f9a8b8f8c8d8e8b8f8a8b8c');
    formData.append('sendRequests[0]', '5f9a8b8f8c8d8e8b8f8a8b8c');
    formData.append('tokens[0][token]', "actual api");
    formData.append('sendProficientRequests[]', user.sendProficientRequests[0]);
    formData.append('receiveProficientRequest[]', user.receiveProficientRequest[0]);


    if (!user.verificationCode) {
      sendVerificationCode(user.email);
    }

    formData.append('verificationCode', user.verificationCode);
    console.log("verificationCode: " + user.verificationCode)

    try {


      const response = await axios.post(`${import.meta.env.VITE_API}/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token);

      formData.append('tokens[0][token]', token);



      notifySuccess();
      navigate('/signin');
      setUser({
        username: '', email: '', password: '', role: '', gender: '', city: '',
        dateOfBirth: '', careerCategory: '', firstName: '', lastName: '',
        phone: '', bio: '', experience: '', coordinates: ['', ''],
      });


    } catch (error) {
      console.error('Error during registration: ', error.response?.data || error.message);
      toast.error('Registration failed.');
    }



  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* <img src={Logo} className='w-[400'/> */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${usernameExist ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]`}
            />
            {usernameExist && <p className="text-red-500 text-sm mt-1">Username already exists</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border ${emailExists ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]`}
            />
            {emailExists && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]"
            />
          </div>

          {/* Gender */}
          <div>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* City */}
          <div>
            <select
              name="city"
              value={user.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]"
            >
              <option value="">Select City</option>
              <option value="Nablus">Nablus</option>
              <option value="Ramallah">Ramallah</option>
              <option value="Hebron">Hebron</option>
              <option value="Bethlehem">Bethlehem</option>
              <option value="Jenin">Jenin</option>
              <option value="Jericho">Jericho</option>
              <option value="Gaza">Gaza</option>
              <option value="Rafah">Rafah</option>
              <option value="Tulkarm">Tulkarm</option>
              <option value="Qalqilya">Qalqilya</option>
              <option value="Salfit">Salfit</option>
              <option value="Tubas">Tubas</option>
              <option value="Jerusalem">Jerusalem</option>
              <option value="Khan Yunis">Khan Yunis</option>
              <option value="Deir al-Balah">Deir al-Balah</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]"
            />
          </div>

          {/* Career Category */}
          <div>
            <select
              name="careerCategory"
              value={user.careerCategory}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]"
            >
              <option value="">Select Career Category</option>
              <option value="Home Services">Home Services</option>
              <option value="Technical Services">Technical Services</option>
              <option value="Educational Services">Educational Services</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Creative Services">Creative Services</option>
              <option value="Legal & Financial Services">Legal & Financial Services</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${user.firstName && user.firstName.length < 3 ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${user.firstName && user.firstName.length < 3 ? 'focus:ring-red-500' : 'focus:ring-[rgb(109,201,126)]'
                  }`}
                placeholder="First Name"
              />
              {user.firstName && user.firstName.length < 3 && (
                <p className="mt-1 text-sm text-red-500">First Name must be at least 3 characters long.</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${user.lastName && user.lastName.length < 3 ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${user.lastName && user.lastName.length < 3 ? 'focus:ring-red-500' : 'focus:ring-[rgb(109,201,126)]'
                  }`}
                placeholder="Last Name"
              />
              {user.lastName && user.lastName.length < 3 && (
                <p className="mt-1 text-sm text-red-500">Last Name must be at least 3 characters long.</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[rgb(109,201,126)] text-white py-2 px-4 rounded-lg hover:bg-[rgb(109,201,126)]/80 focus:outline-none focus:ring focus:ring-[rgb(109,201,126)]"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/signin" className="text-[#0a8bff] hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );



}

export default Signup;
