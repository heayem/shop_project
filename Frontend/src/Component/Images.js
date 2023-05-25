const Images = ({ src, width, height }) => {
    return <img
        src={src}
        style={{
            width: width,
            height: height
        }}
        alt="" />
}
export default Images