import Instructor from './instructor';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Staff = ({ filtered, images }) => {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 md:grid-cols-4 gap-2 m-auto md:w-3/4"
    >
      <AnimatePresence>
        {filtered.map(item => (
          <Instructor item={item} key={item.instruktor_id} images={images} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Staff;
