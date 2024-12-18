import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';


const VoterRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: '',
    idNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    fingerprint: ''
  });
  const [message, setMessage] = useState<JSX.Element | string>('');
  const [isCapturing, setIsCapturing] = useState(false);

  const handleFingerprintCapture = async () => {
    setIsCapturing(true);
    try {
      // WebAuthn fingerprint capture
      const fingerprintData = await captureFingerprint();
      setFormData({ ...formData, fingerprint: fingerprintData });
      setMessage(<p style={{ color: 'green' }}>Fingerprint captured successfully.</p>);
    } catch (error) {
      console.log('Error capturing fingerprint:', error);
      setMessage(<p style={{ color: 'red' }}>Failed to capture fingerprint. Please try again.</p>);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate mobile number format
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(formData.mobile)) {
      setMessage(<p style={{ color: 'red' }}>Invalid mobile number format. Please enter a 10-digit mobile number.</p>);
      return;
    }

    // Capture form data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('mobile', formData.mobile);
    data.append('email', formData.email);
    data.append('age', formData.age);
    data.append('idNumber', formData.idNumber);
    data.append('address', formData.address);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    data.append('fingerprint', formData.fingerprint);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwgqXwWxFQf4bR7Hj9lEWKPQG4O5fUN26FvYU3CcW4ufIh6Stp_5BLCX8xCrN7fGA-n/exec', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      if (result.success) {
        setMessage(<p style={{ color: 'green' }}>{result.message}</p>);
        setTimeout(() => {
          window.location.href = '/'; // Adjust the path to your homepage
        }, 3000);
      } else {
        setMessage(<p style={{ color: 'red' }}>{result.message}</p>);
      }
    } catch (error) {
      console.log('Error:', error);
      setMessage(<p style={{ color: 'red' }}>An error occurred. Please try again.</p>);
    }

    // Store data in Excel sheet
    storeDataInExcel(formData);
  };

  const storeDataInExcel = (data: any) => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      ['Name', 'Mobile', 'Email', 'Age', 'ID Number', 'Address', 'Password', 'Fingerprint'],
      [data.name, data.mobile, data.email, data.age, data.idNumber, data.address, data.password, data.fingerprint]
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Voter Data');
    XLSX.writeFile(workbook, 'voter_data.xlsx');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900 flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-slate-800 p-8 rounded-lg shadow-xl border border-blue-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center space-x-3 mb-6 justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UserPlus className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-white">Voter Registration</h2>
          </motion.div>

          <form id="registrationForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name (As per ID)
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                  required
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-300">
                  Valid ID Number
                </label>
                <input
                  type="text"
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                  required
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                Permanent Address
              </label>
              <textarea
                id="address"
                rows={5}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full rounded-md bg-slate-700 border-gray-600 text-white pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                  required
                />
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                type="button"
                onClick={handleFingerprintCapture}
                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                disabled={isCapturing}
              >
                <Fingerprint className="w-5 h-5" />
                <span>{isCapturing ? 'Capturing...' : 'Capture Fingerprint'}</span>
              </button>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </form>

          <motion.div
            id="message"
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.div>

          <motion.p
            className="mt-4 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Already have an account?{' '}
            <Link to="/voter-login" className="text-blue-500 hover:text-blue-400">
              Login here
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterRegistration;

// WebAuthn function to capture fingerprint
const captureFingerprint = async () => {
  try {
    const publicKey = {
      challenge: new Uint8Array([0x8C, 0x7D, 0x6E, 0x5F, 0x4A, 0x3B, 0x2C, 0x1D]),
      rp: {
        name: "Example Corp"
      },
      user: {
        id: new Uint8Array(16),
        name: "user@example.com",
        displayName: "User"
      },
      pubKeyCredParams: [
        {
          type: "public-key" as PublicKeyCredentialType,
          alg: -7
        }
      ],
      timeout: 60000,
      attestation: "direct" as AttestationConveyancePreference,
      authenticatorSelection: {
        authenticatorAttachment: "platform" as AuthenticatorAttachment,
        userVerification: "required" as UserVerificationRequirement
      }
    };

    const credential = await navigator.credentials.create({ publicKey });
    console.log('Authentication successful', credential);
    const credentialData = {
      id: credential?.id || '',
      type: credential?.type || '',
      rawId: Array.from(new Uint8Array((credential as PublicKeyCredential)?.rawId || [])),
      response: {
        clientDataJSON: Array.from(new Uint8Array((credential as PublicKeyCredential).response.clientDataJSON || [])),
        attestationObject: Array.from(new Uint8Array(((credential as PublicKeyCredential).response as AuthenticatorAttestationResponse).attestationObject || new ArrayBuffer(0)))
      }
    };
    return JSON.stringify(credentialData); // Replace with actual fingerprint data
  } catch (error) {
    console.error('Authentication failed', error);
    throw new Error('Fingerprint capture failed');
  }
};
