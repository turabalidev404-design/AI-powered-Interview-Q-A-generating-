
interface ButtonProps {
  TypeBtn : "submit",
Text: String,
}
const Button = ({
  TypeBtn,
Text
}:ButtonProps) => {
  

  return (
    <>
      <button
      type={TypeBtn}
      >{Text}</button>
    </>
  )
}

export default Button