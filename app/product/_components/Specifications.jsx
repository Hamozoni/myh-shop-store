
function Specifications({specifications}) {

  return (

    <section className="py-4 border-b border-gray-100 capitalize">
        <h4  className="pb-2 text-lg font-bold text-teal-950">product specifications</h4>
        <ul className="bg-teal-50 p-3 rounded-md">
            {
                specifications?.map((specif)=> (

                    <li 
                        className="flex items-center mb-3 gap-4 bg-white rounded-md py-1 px-3"
                        key={specif?.id}
                        >
                        <span 
                            className="font-bold text-md text-teal-900 flex-1">
                                {specif?.key} : 
                        </span>
                        <span 
                            className="text-sm text-teal-600"
                            >{specif?.value}
                        </span>
                    </li>

                ))
            }
        </ul>
    </section>
  )
}

export default Specifications