const Footer = () => {
  return (
    <footer className='bg-primary-600 dark:bg-primary-100 text-gray-100 dark:text-gray-900 py-2 text-center z-40'>
      <p>&copy; {new Date().getFullYear()} TalentHub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
