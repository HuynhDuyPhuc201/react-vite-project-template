import StartCategory from './Type/Rating';
import PriceCategory from './Type/Price';
import TextCategory from './Type/Catergory';
import { useParams } from 'react-router-dom';
const Navbar = ({ ratingObj, priceObj }) => {
    const { id } = useParams();

    return (
        <>
            <div className="flex items-center flex-col mt-5 w-full">
                <TextCategory />
                {/* {id && ( */}
                <>
                    <StartCategory ratingObj={ratingObj} />
                    <PriceCategory priceObj={priceObj} />
                </>
                {/* )} */}
            </div>
        </>
    );
};

export default Navbar;
