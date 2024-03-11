export default function DateProvider(){
    let date = new Date();
    let day = date.getDate();
    day =  day < 10 ? "0" + day : day;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    year =  year < 10 ? "0" +year : year;
    let final = `${month}/${day}/${year}`
    return(
        <>
            <p>
                {
                    final
                }
            </p>
        </>
    );
}