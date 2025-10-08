import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { Card } from '../components/Common/Card';
import { Table } from '../components/Common/Table';
import { Button } from '../components/Common/Button';
import { Contact } from '../types';
// @ts-ignore
import { RecordManager } from '../components/RecordManager';
import { Plus, Edit, Trash2, Search as SearchIcon, Download, FileText, FileSpreadsheet, User, Phone, Mail, Building, MapPin, Globe } from 'lucide-react';

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'search' | 'creation' | 'edition' | 'records'>('search');
  const [contactRecords, setContactRecords] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Liste des pays et préfixes
  const countries = [
    { name: "Côte d'Ivoire", code: "+225" },
    { name: "Cameroun", code: "+237" },
    { name: "Togo", code: "+228" },
    { name: "Bénin", code: "+229" },
    { name: "Italie", code: "+39" },
    { name: "Sierra Leone", code: "+232" },
    { name: "Romanie", code: "+40" },
    { name: "Autre", code: "" }
  ];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    group: '',
    company: '',
    address: '',
    country: '',
    email: '',
    cellPhone1: '',
    cellPhone2: '',
    landlinePhone: ''
  });
  
  // Fonction pour formater les numéros avec préfixe
  const formatPhoneNumber = (phone: string, countryCode: string) => {
    if (!phone) return '';
    // Si le numéro commence déjà par le code pays, on le retourne tel quel
    if (countryCode && phone.startsWith(countryCode)) {
      return phone;
    }
    // Sinon, on ajoute le code pays (s'il existe)
    return countryCode ? `${countryCode} ${phone}` : phone;
  };
  
  // Charger les contacts au démarrage
  useEffect(() => {
    fetchContacts();
  }, []);
  
  // Helpers pour le tableau et l'export
  type TableContact = Contact & { id: string };
  
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.cellPhone1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.landlinePhone && contact.landlinePhone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.country && contact.country.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });
  
  const tableContacts: TableContact[] = filteredContacts.map((c) => ({ ...c, id: c._id || c.id || '' }));
  
  // Fonctions d'export
  const exportToCSV = () => {
    const header = ['Nom', 'Prénom', 'Groupe', 'Entreprise', 'Adresse', 'Pays', 'Email', 'Numéro', 'Téléphone fixe', 'Autre numéro'];
    const rows = filteredContacts.map(c => {
      const countryObj = countries.find(ct => ct.name === c.country);
      const prefix = countryObj ? countryObj.code : '';
      return [
        c.lastName, 
        c.firstName, 
        c.group, 
        c.company || '', 
        c.address, 
        c.country || '', 
        c.email, 
        formatPhoneNumber(c.cellPhone1, prefix),
        c.landlinePhone || '',
        c.cellPhone2 || ''
      ];
    });
    let csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].map(e => e.map(x => '"'+(x||'')+'"').join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'contacts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportToPDF = async () => {
    try {
      // Import dynamique des bibliothèques
      const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable')
      ]);
      const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'A4' });
      // Configuration du document PDF
      doc.setFontSize(18);
      doc.text('Liste des contacts', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
      // Date de génération
      doc.setFontSize(10);
      doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, doc.internal.pageSize.getWidth() / 2, 60, { align: 'center' });
      // En-têtes du tableau
      const headers = [
        'Nom',
        'Prénom',
        'Groupe',
        'Entreprise',
        'Adresse',
        'Pays',
        'Email',
        'Numéro',
        'Téléphone fixe',
        'Autre numéro'
      ];
      // Données du tableau avec préfixe pays pour les numéros
      const data = filteredContacts.map(c => {
        const countryObj = countries.find(ct => ct.name === c.country);
        const prefix = countryObj ? countryObj.code : '';
        return [
          c.lastName,
          c.firstName,
          c.group,
          c.company || '',
          c.address,
          c.country || '',
          c.email,
          formatPhoneNumber(c.cellPhone1, prefix),
          c.landlinePhone || '',
          c.cellPhone2 || ''
        ];
      });
      // Configuration du tableau
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 80,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          valign: 'middle',
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          0: { cellWidth: 60 },  // Nom
          1: { cellWidth: 60 },  // Prénom
          2: { cellWidth: 90 },  // Groupe
          3: { cellWidth: 70 },  // Entreprise
          4: { cellWidth: 90 },  // Adresse
          5: { cellWidth: 60 },  // Pays
          6: { cellWidth: 110 }, // Email
          7: { cellWidth: 80 },  // Numéro
          8: { cellWidth: 80 },  // Téléphone fixe
          9: { cellWidth: 80 }   // Autre numéro
        },
        didDrawCell: (data) => {
          // Forcer le retour à la ligne si le texte est trop long
        }
      });
      // Pied de page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Page ${i} sur ${pageCount}`,
          doc.internal.pageSize.getWidth() - 40,
          doc.internal.pageSize.getHeight() - 20,
          { align: 'right' }
        );
      }
      // Sauvegarde du fichier
      doc.save('contacts.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      setError('Impossible de générer le fichier PDF');
    }
  };
  const exportToXLS = () => {
    const header = ['Nom', 'Prénom', 'Groupe', 'Entreprise', 'Adresse', 'Pays', 'Email', 'Numéro', 'Téléphone fixe', 'Autre numéro'];
    const rows = filteredContacts.map(c => {
      const countryObj = countries.find(ct => ct.name === c.country);
      const prefix = countryObj ? countryObj.code : '';
      return [
        c.lastName,
        c.firstName,
        c.group,
        c.company || '',
        c.address,
        c.country || '',
        c.email,
        formatPhoneNumber(c.cellPhone1, prefix),
        c.landlinePhone || '',
        c.cellPhone2 || ''
      ];
    });
    // Encodage UTF-8 BOM pour Excel
    let xlsContent = '\uFEFF' + [header, ...rows].map(e => e.map(x => '"' + (x || '') + '"').join('\t')).join('\n');
    const blob = new Blob([xlsContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contacts.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Fonctions CRUD
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Erreur lors du chargement des contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de charger les contacts');
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleDeleteContact = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) return;
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setContacts(contacts.filter(contact => (contact._id || contact.id) !== id));
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de supprimer le contact');
    } finally {
      setIsDeleting(null);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const isCreation = view === 'creation';
      const url = isCreation 
        ? '/api/contacts' 
        : `/api/contacts/${editingContact?._id || editingContact?.id}`;
      
      const method = isCreation ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la sauvegarde');
      }
      
      const savedContact = await response.json();
      
      if (isCreation) {
        setContacts([...contacts, savedContact]);
      } else {
        setContacts(contacts.map(contact => 
          (contact._id || contact.id) === (savedContact._id || savedContact.id) ? savedContact : contact
        ));
      }
      
      // Réinitialiser le formulaire
      resetForm();
      
      // Revenir à la vue recherche
      setView('search');
    } catch (error) {
      console.error('Erreur:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      group: '',
      company: '',
      address: '',
      country: '',
      email: '',
      cellPhone1: '',
      cellPhone2: '',
      landlinePhone: ''
    });
    setEditingContact(null);
  };
  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      group: contact.group,
      company: contact.company || '',
      address: contact.address,
      country: contact.country || '',
      email: contact.email,
      cellPhone1: contact.cellPhone1,
      cellPhone2: contact.cellPhone2 || '',
      landlinePhone: contact.landlinePhone || ''
    });
    setView('edition');
  };
  // Colonnes du tableau
  const columns = [
    {
      key: 'lastName',
      title: 'Nom',
      dataIndex: 'lastName',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      key: 'firstName',
      title: 'Prénom',
      dataIndex: 'firstName'
    },
    {
      key: 'group',
      title: 'Groupe',
      dataIndex: 'group'
    },
    {
      key: 'company',
      title: 'Entreprise',
      dataIndex: 'company',
      render: (text: string) => text || '-'
    },
    {
      key: 'address',
      title: 'Adresse',
      dataIndex: 'address'
    },
    {
      key: 'country',
      title: 'Pays',
      dataIndex: 'country',
      render: (text: string) => text || '-'
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      render: (text: string) => <a href={`mailto:${text}`} className="text-blue-600 hover:underline">{text}</a>
    },
    {
      key: 'numero',
      title: 'Numéro',
      render: (_: any, record: Contact) => {
        // Chercher le préfixe du pays
        const countryObj = countries.find(c => c.name === record.country);
        const prefix = countryObj ? countryObj.code : '';
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-sm">
              <Phone size={14} className="mr-1 text-gray-500" />
              <span className="font-medium">{formatPhoneNumber(record.cellPhone1, prefix)}</span>
            </div>
            {record.landlinePhone && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Phone size={14} className="mr-1 text-gray-500" />
                <span>{record.landlinePhone}</span>
              </div>
            )}
            {record.cellPhone2 && (
              <div className="flex items-center text-sm text-blue-600 mt-1">
                <Phone size={14} className="mr-1 text-gray-500" />
                <span>{record.cellPhone2}</span>
              </div>
            )}
          </div>
        );
      }
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, record: TableContact) => (
        <div className="flex space-x-2 justify-end">
          <Button 
            variant="secondary" 
            size="sm" 
            icon={Edit} 
            className="text-blue-600 hover:text-blue-800 border-blue-200 hover:border-blue-300"
            onClick={() => handleEditContact(record)}
          >
            Modifier
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            icon={Trash2}
            onClick={() => handleDeleteContact(record.id)}
            disabled={isDeleting === record.id}
            loading={isDeleting === record.id}
            className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
          >
            {isDeleting === record.id ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      ),
    }
  ];
  return (
    <div>
      <PageHeader 
        title="Gestion des Contacts"
        actions={
          <Button 
            icon={Plus} 
            onClick={() => {
              resetForm();
              setView('creation');
            }}
            variant="primary"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Ajouter un contact
          </Button>
        }
      />
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <Card>
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${view === 'search' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => {
              resetForm();
              setView('search');
            }}
          >
            Recherche
          </button>
          <button
            className={`px-4 py-2 font-medium ${view === 'creation' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => {
              resetForm();
              setView('creation');
            }}
          >
            Création
          </button>
          {view === 'edition' && (
            <button
              className={`px-4 py-2 font-medium ${view === 'edition' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Modification
            </button>
          )}
          <button
            className={`px-4 py-2 font-medium ${view === 'records' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setView('records')}
          >
            Enregistrements
          </button>
        </div>
        
        {view === 'search' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Rechercher un contact</h2>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <div className="flex">
                    <div className="relative flex-1">
                      <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="searchTerm"
                        placeholder="Nom, prénom, entreprise, email, groupe, numéro, pays..."
                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="primary" 
                      className="ml-2"
                      icon={SearchIcon}
                    >
                      Rechercher
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Liste des contacts</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">
                  {filteredContacts.length} contact(s) trouvé(s)
                </span>
                {filteredContacts.length > 0 && (
                  <div className="flex space-x-2">
                    <Button variant="secondary" icon={FileText} size="sm" onClick={exportToPDF}>PDF</Button>
                    <Button variant="secondary" icon={FileSpreadsheet} size="sm" onClick={exportToXLS}>EXCEL</Button>
                    <Button variant="secondary" icon={Download} size="sm" onClick={exportToCSV}>CSV</Button>
                  </div>
                )}
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredContacts.length > 0 ? (
              <Table
                data={tableContacts}
                columns={columns}
              />
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg mt-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <User size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg mb-2">Aucun contact trouvé</p>
                <Button 
                  variant="primary" 
                  icon={Plus}
                  onClick={() => setView('creation')}
                >
                  Ajouter un contact
                </Button>
              </div>
            )}
          </div>
        )}
        
        {(view === 'creation' || view === 'edition') && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
              <User size={24} className="mr-2" />
              {view === 'creation' ? 'Ajouter un nouveau contact' : 'Modifier un contact'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-end space-x-4 mb-6">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enregistrement...
                    </span>
                  ) : (
                    view === 'creation' ? 'Enregistrer' : 'Mettre à jour'
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => {
                    resetForm();
                    setView('search');
                  }}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <User size={14} className="mr-1" />
                      Nom <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <User size={14} className="mr-1" />
                      Prénom <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Building size={14} className="mr-1" />
                      Groupe de contact <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select 
                      name="group"
                      value={formData.group}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choisir</option>
                      <option value="client">Client</option>
                      <option value="fournisseur">Fournisseur</option>
                      <option value="consultants">Consultants</option>
                      <option value="administration_publique">Administration publique</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Building size={14} className="mr-1" />
                      Entreprise
                    </label>
                    <select 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choisir</option>
                      <option value="SITINFRA SARL">SITINFRA SARL</option>
                      <option value="Administration">Administration</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Coordonnées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      Adresse <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Globe size={14} className="mr-1" />
                      Pays
                    </label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choisir</option>
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>{country.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Mail size={14} className="mr-1" />
                      E-mail <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Phone size={14} className="mr-1" />
                      Numéro <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex">
                      {formData.country && (
                        <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-600">
                          {countries.find(c => c.name === formData.country)?.code || ''}
                        </span>
                      )}
                      <input 
                        type="text" 
                        name="cellPhone1"
                        value={formData.cellPhone1}
                        onChange={handleInputChange}
                        required
                        placeholder="Numéro de téléphone"
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formData.country ? 'rounded-r-md' : 'rounded-md'}`}
                        style={formData.country ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {}}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Phone size={14} className="mr-1" />
                      Téléphone fixe
                    </label>
                    <input 
                      type="text" 
                      name="landlinePhone"
                      value={formData.landlinePhone}
                      onChange={handleInputChange}
                      placeholder="Numéro de téléphone fixe"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Phone size={14} className="mr-1" />
                      Autre numéro
                    </label>
                    <input 
                      type="text" 
                      name="cellPhone2"
                      value={formData.cellPhone2}
                      onChange={handleInputChange}
                      placeholder="Autre numéro de téléphone"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        
        {view === 'records' && (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Gestion des enregistrements de contacts</h3>
            <RecordManager
              entityType="contact"
              fields={[
                {
                  name: 'title',
                  label: 'Titre',
                  type: 'text',
                  required: true,
                  placeholder: 'Entrez le titre'
                },
                {
                  name: 'description',
                  label: 'Description',
                  type: 'textarea',
                  required: true,
                  placeholder: 'Entrez la description'
                },
                {
                  name: 'date',
                  label: 'Date',
                  type: 'date',
                  required: true
                },
                {
                  name: 'type',
                  label: 'Type',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'meeting', label: 'Réunion' },
                    { value: 'call', label: 'Appel téléphonique' },
                    { value: 'email', label: 'Email' },
                    { value: 'note', label: 'Note' },
                    { value: 'task', label: 'Tâche' }
                  ]
                },
                {
                  name: 'status',
                  label: 'Statut',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'pending', label: 'En attente' },
                    { value: 'in_progress', label: 'En cours' },
                    { value: 'completed', label: 'Terminé' },
                    { value: 'cancelled', label: 'Annulé' }
                  ]
                }
              ]}
              initialRecords={contactRecords}
              onRecordsChange={setContactRecords}
              onRecordAdd={async (record: any) => {
                // In a real app, this would be an API call
                console.log('Adding contact record:', record);
                return record;
              }}
              onRecordUpdate={async (id: string, record: any) => {
                // In a real app, this would be an API call
                console.log('Updating contact record:', id, record);
              }}
              onRecordDelete={async (id: string) => {
                // In a real app, this would be an API call
                console.log('Deleting contact record:', id);
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
}