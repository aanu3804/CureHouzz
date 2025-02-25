import React from 'react'
import { formatDate } from '../../utils/formatDate'

const DoctorAbout = () => {
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                About of
                <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                    Kalpesh Vishwakarma
                </span>
            </h3>
            <p className="text__para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quis aliquam nobis nulla optio ab cum excepturi, voluptates animi dolore eveniet numquam, quo et possimus quibusdam eligendi esse cupiditate velit laudantium sequi asperiores, architecto inventore ipsum repellendus. Sit dolorum velit magni voluptatem optio veniam tempora saepe, quae, quibusdam cupiditate doloribus.
            </p>

        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Education
            </h3>

            <ul className='pt-4 md:p-5'>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formatDate('12-10-2009')} - {formatDate('12-10-2012')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            PhD in Surgeon
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        New Apollo Hospital, New York.
                    </p>
                </li>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                        {formatDate('09-11-2012')} - {formatDate('12-10-2013')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            PhD in Surgeon
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        New Apollo Hospital, New York.
                    </p>
                </li>
            </ul>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Experience 
            </h3>

            <ul className='grip sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                <li className='p-4 rounded bg-[#ff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formatDate("07-04-2010")}-{formatDate("07-04-2014")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Sr. Surgeon
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                            New Apollo Hospital, New York.
                    </p>
                </li>
                <li className='p-4 rounded bg-[#ff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formatDate("07-04-2010")}-{formatDate("07-04-2014")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Sr. Surgeon
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                            New Apollo Hospital, New York.
                    </p>
                </li>
            </ul>
        </div>

    </div>
  )
}

export default DoctorAbout
