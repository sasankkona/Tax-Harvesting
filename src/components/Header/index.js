import logo from '../../logo.png'

import './index.css'

const Header = () => {
    return (
        <div className='container'>
            <img src={logo} alt="website logo of koinx" className='image'/>
        </div>
    )
}

export default Header