import React from 'react';
import { Package, Plus, Trash2 } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { componentDatabase } from '../../data/componentDatabase';

const ItemsTable = () => {
  const { selectedItems, addItemRow, removeItemRow, updateItem } = useQuotation();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Package size={20} />
          Selected Items
        </h2>
        <button
          onClick={addItemRow}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Component</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-left">Warranty</th>
              <th className="p-3 text-right">Purchase Price</th>
              <th className="p-3 text-right">Sale Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-700">
                <td className="p-3">
                  <select
                    value={item.category}
                    onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    className="w-full bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {Object.keys(componentDatabase).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <select
                    value={item.component || ''}
                    onChange={(e) => updateItem(item.id, 'component', e.target.value)}
                    className="w-full bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    disabled={!item.category}
                  >
                    <option value="">Select Component</option>
                    {item.category && componentDatabase[item.category].map(comp => (
                      <option key={comp.name} value={comp.name}>{comp.name}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                    className="w-20 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    min="1"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    value={item.warranty}
                    onChange={(e) => updateItem(item.id, 'warranty', e.target.value)}
                    className="w-32 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 1 Year"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={item.purchasePrice}
                    onChange={(e) => updateItem(item.id, 'purchasePrice', parseFloat(e.target.value))}
                    className="w-24 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    step="0.01"
                    placeholder="Purchase"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={item.isCustomPrice ? item.customPrice : item.basePrice}
                    onChange={(e) => updateItem(item.id, 'customPrice', parseFloat(e.target.value))}
                    className="w-24 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    step="0.01"
                    placeholder="Sale"
                  />
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeItemRow(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;