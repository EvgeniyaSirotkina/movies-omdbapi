function Header () {
    return (  
        <nav className='indigo accent-3'>
            <div className='nav-wrapper'>
            <a href='#' className='brand-logo right'>React Movies</a>
            <ul id='nav-mobile' className='left hide-on-med-and-down'>
                <li>
                    <a 
                        href='https://github.com/EvgeniyaSirotkina?tab=repositories' 
                        target='_blank' 
                        rel='noreferrer'
                    >
                        GitHub
                    </a>
                </li>
            </ul>
            </div>
        </nav>
    );
}

export { Header }