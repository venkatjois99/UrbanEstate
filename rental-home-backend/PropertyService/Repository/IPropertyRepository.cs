﻿using Microsoft.AspNetCore.Mvc;
using PropertyService.Models;

namespace PropertyService.Repository
{
    public interface IPropertyRepository
    {
        Task<Dictionary<string, int>> GetPropertyCountByType();

        Task<IEnumerable<PropertyModel>> GetAllProperties();
        Task<PropertyModel> GetPropertyById(int id);
        Task<(int, string)> AddProperty(PropertyModel property);

        Task UpdateProperty(PropertyModel property);
        Task DeleteProperty(int id);
        Task<IEnumerable<PropertyModel>> GetPropertiesByType(string propertyType);
        Task<IEnumerable<PropertyModel>> GetPropertiesByUserId(string userId);
        Task<IEnumerable<PropertyModel>> SearchProperties(PropertySearchParameters searchParameters);
    }
}
       
