import React from 'react';
import { Link } from 'react-router-dom';

export function Breadcrumbs({ stack, current }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {stack &&
          stack.map((item) => (
            <li className="breadcrumb-item" key={item.title}>
              <Link to={item.url}>{item.title}</Link>
            </li>
          ))}
        <li className="breadcrumb-item active" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}

// export function Breadcrumbs({ items }) {
//   const itemElements = [];
//   if (Array.isArray(items)) {
//     let i = 0;
//     let n = items.length - 1;
//     for (; i < n; ++i) {
//       const item = items[i];
//       itemElements.push(
//         <li className="breadcrumb-item" key={item.title}>
//           <Link to={item.url}>{item.title}</Link>
//         </li>
//       );
//     }
//     if (i === n) {
//       const item = items[i];
//       itemElements.push(
//         <li className="breadcrumb-item active" key={item.title}>
//           {item.title}
//         </li>
//       );
//     }
//   }
//
//   return (
//     <nav aria-label="breadcrumb">
//       <ol className="breadcrumb">{itemElements}</ol>
//     </nav>
//   );
// }
