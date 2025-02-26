import StartCategory from './Category/StartCategory ';
import PriceCategory from './Category/PriceCategory';
import TextCategory from './Category/TextCategory';
import { useParams } from 'react-router-dom';
const Navbar = ({ ratingObj, priceObj }) => {
    const { id } = useParams();

    return (
        <>
            <div className="flex items-center flex-col mt-5 w-full">
                <TextCategory />
                {id && (
                    <>
                        <StartCategory ratingObj={ratingObj} />
                        <PriceCategory priceObj={priceObj} />
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
