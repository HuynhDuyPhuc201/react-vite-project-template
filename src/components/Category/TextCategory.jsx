const TextCategory = ({ options }) => (
    <div className="category bg-[#fff] rounded-[8px] p-10 w-full my-2">
        <p className="text-[20px] text-[#333] font-bold mb-5">Danh mục</p>
        {options.map((item, index) => (
            <li key={index} className="text-[16px] text-[#333] cursor-pointer">
                {item}
            </li>
        ))}
    </div>
);

export default TextCategory;
