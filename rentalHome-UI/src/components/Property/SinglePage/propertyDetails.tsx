import { FaRupeeSign, FaHeart, FaCalendarAlt, FaBed } from 'react-icons/fa';
import Slider from '../../additional-Components/ImageSlider/slider';
import Footer from '../../footer/footer';
import './propertyDetails.css'
import { useLocation } from 'react-router-dom';
import { Property } from '../../../models/propertyModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import ChatBox from '../../../components/additional-Components/ChatBox/chatBox';
import { getUserDetailsByIdService } from '../../../RentalServices/Services/userService'; // Import the service
import { UserModelDTO } from '../../../models/registerUserModel'

const PropertyDetails = () => {
  const [owner, setOwner] = useState<UserModelDTO>({
    userId: 0,
    userName: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const location = useLocation();
  const propertyItem: Property = location.state?.property;

  // Fetch user details using service directly (instead of thunk)
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (propertyItem?.userId) {
        setLoading(true);
        setError('');
        try {
          const response = await getUserDetailsByIdService(propertyItem.userId);
          setOwner({
            userId: response.data.userId,
            userName: response.data.userName,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
          });
        } catch (err) {
          setError('Failed to load owner details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [propertyItem]); // This effect runs when the propertyItem changes

  // Handle loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!propertyItem) {
    return <div>Property not found</div>;
  }

  return (
    <div>
      <div className="singlePage">
        <div className="imageSection">
          <Slider images={propertyItem.images} />
        </div>

        <div className="contentContainer">
          {/* Info Section */}
          <div className="infoSection">
            <div className="topSection">
              <div className="titleRatingSection">
                <h1>{propertyItem.title}</h1>
              </div>

              <div className="priceIconContainer">
                <div className="priceSection">
                  <FaRupeeSign />
                  <span className="price">{propertyItem.rent}</span>
                </div>

                <div className="iconSection">
                  <div className="iconItem">
                    <FaCalendarAlt color="#216B9B" /> <span>Posted Date: {propertyItem.postingDate.slice(0, propertyItem.postingDate.indexOf('T'))}</span>
                  </div>
                  <div className="iconItem">
                    <FaBed color="#216B9B" /> <span> {propertyItem.propertyType === 'apartment' || propertyItem.propertyType === 'house' ? propertyItem.bhkType :
                      propertyItem.propertyType === 'pg' ? ` ${propertyItem.pgSharingType} sharing` :
                        propertyItem.propertyType === 'flatmates' ? `${propertyItem.sharedBedrooms} Room` : ''}</span>
                  </div>
                  <div className="iconItem">
                    {propertyItem.propertyType === 'apartment' || propertyItem.propertyType === 'house' ? <> <FontAwesomeIcon icon={faChair} color="#216B9B" /> {propertyItem.furnishing} </> : ''}
                    {propertyItem.propertyType === 'pg' ? <><FontAwesomeIcon icon={faUsers} color="#216B9B" /> {propertyItem.pgLivingType}</> : ''}
                    {propertyItem.propertyType === 'flatmates' ? <><FontAwesomeIcon icon={faUsers} color="#216B9B" />{propertyItem.preferredFlatmate} Gender </> : ''}
                  </div>
                </div>
              </div>

              <p className="address">{propertyItem.address}</p>
              <p className="description">{propertyItem.description}</p>
            </div>
          </div>
          {/* Right Section */}
          <div className="rightSection">
            <div>
              <ChatBox propertyId={propertyItem.id} propertyUserId={propertyItem.userId} />
            </div>
            {/* Owner Profile */}
            <div className="ownerProfile">
              <h4>Owner: {owner.userName}</h4>
              <p>{owner.phoneNumber}</p>
              <p>{owner.email}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer showExtra={true} />
    </div>
  );
};

export default PropertyDetails;
