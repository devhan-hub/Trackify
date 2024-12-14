 export const CustomDate = () => {
    const date = new Date(); 
    const dayOptions = { weekday: 'long' }; 
    const dayName = date.toLocaleDateString('en-US', dayOptions).toUpperCase(); 
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

   
    return (
        <div style={{ whiteSpace: 'pre-line', textAlign: 'center', fontSize:'15px',paddingInline:'10px' }}>
            <p className="capitalize">{dayName}</p>
            < p className="text-[#3abeff]">{`${day}/${month}.${year}`}</p>
            
        </div>
    );
};

