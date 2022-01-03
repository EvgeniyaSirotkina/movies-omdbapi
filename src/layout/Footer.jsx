function Footer () {
    return (  
        <footer className='page-footer indigo accent-1'>
          <div className='footer-copyright indigo accent-1'>
            <div className='container black-text text-darken-2 '>
            © {new Date().getFullYear()} All rights reserved
            <a 
              className='black-text text-darken-2 right' 
              href='https://github.com/EvgeniyaSirotkina?tab=repositories' 
              target='_blank'
              rel='noreferrer'
            >GitHub</a>
            </div>
          </div>
        </footer>
    );
}

export { Footer }