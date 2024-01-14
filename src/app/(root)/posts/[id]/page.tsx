

const pages = ({params,searchParams}:any) => {
  console.log(searchParams)
  return (
    <div>{params.id}</div>
  )
}

export default pages