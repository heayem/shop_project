import { Link } from 'react-router-dom'
import Icon from '../Component/Icon.compo'

import './Header.css'
const Header = () => {
    return (
        <div className='mainLink'>

            <div>
                <Link to='/' className='link'> <p><Icon choose={'person'} /> Dasboard </p> </Link>
            </div>
            <div>
                <Link to='/Product' className='link' ><p><Icon choose={'item'} /> Product </p></Link>
            </div>

            <div>
                <Link to='/Category' className='link' > <p><Icon choose={'category'} /> Category</p></Link>
            </div>
            <div>
                <Link to='/user' className='link' ><p><Icon choose={'person-card'} /> User</p> </Link>
            </div>
            <div>
                <Link to='/profile' className='link'><p><Icon choose={'profile'} /> profile </p></Link>
            </div>
        </div>
    )
}
export default Header