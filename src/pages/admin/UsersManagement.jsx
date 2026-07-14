import { useState, useEffect } from "react";
import { Search, UserPlus, ShieldCheck, Ban, CheckCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import {
  getUsers,
  createUser,
  updateUserRole,
  toggleUserActive,
  deleteUser,
} from "../../api/userApi";
import { createAgent } from "../../api/adminApi";
import { USER_ROLES } from "../../utils/enums";
import { getInitials, formatDate, getErrorMessage } from "../../utils/helpers";
import { validateRegisterForm } from "../../utils/validators";

const emptyUserForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  role: "Passenger",
  dateOfBirth: "",
  nationality: "",
};

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [roleModalUser, setRoleModalUser] = useState(null);
  const [newRole, setNewRole] = useState("Passenger");

  const [confirmAction, setConfirmAction] = useState(null); // { type, user }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchUsers(term = searchTerm) {
    setLoading(true);
    try {
      const data = await getUsers({
        PageNumber: page,
        PageSize: 10,
        SearchTerm: term || undefined,
      });
      setUsers(data?.items || []);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    fetchUsers(searchTerm);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleCreateSubmit(e) {
    e.preventDefault();
    const errors = validateRegisterForm(userForm);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (userForm.role === "Agent") {
        await createAgent({
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          email: userForm.email,
          phoneNumber: userForm.phoneNumber,
        });
        toast.success("Agent created successfully");
      } else {
        const { confirmPassword, ...payload } = userForm;
        await createUser(payload);
        toast.success("User created successfully");
      }
      setCreateModalOpen(false);
      setUserForm(emptyUserForm);
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRoleSubmit() {
    if (!roleModalUser) return;
    setIsSubmitting(true);
    try {
      await updateUserRole(roleModalUser.id, newRole);
      toast.success("Role updated successfully");
      setRoleModalUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmAction() {
    if (!confirmAction) return;
    setIsSubmitting(true);
    try {
      if (confirmAction.type === "toggle") {
        await toggleUserActive(confirmAction.user.id, !confirmAction.user.isActive);
        toast.success(
          confirmAction.user.isActive ? "User deactivated" : "User activated"
        );
      } else if (confirmAction.type === "delete") {
        await deleteUser(confirmAction.user.id);
        toast.success("User deleted");
      }
      setConfirmAction(null);
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-1">User Management</h1>
          <p className="text-muted">Manage passengers, agents, and admins</p>
        </div>
        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => {
            setUserForm(emptyUserForm);
            setFormErrors({});
            setCreateModalOpen(true);
          }}
        >
          Add User
        </Button>
      </div>

      <Card className="mb-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="flex-1">
            <Input
              icon={Search}
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
      </Card>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={32} className="text-navy" />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-muted text-sm py-16">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-soft text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold text-navy">User</th>
                  <th className="px-5 py-3 font-semibold text-navy">Role</th>
                  <th className="px-5 py-3 font-semibold text-navy">Status</th>
                  <th className="px-5 py-3 font-semibold text-navy">Joined</th>
                  <th className="px-5 py-3 font-semibold text-navy text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-soft/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-navy text-gold flex items-center justify-center text-xs font-semibold overflow-hidden flex-shrink-0">
                          {u.profilePictureUrl ? (
                            <img src={u.profilePictureUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            getInitials(u.fullName)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-navy truncate">{u.fullName}</p>
                          <p className="text-xs text-muted truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={u.role === "Admin" ? "gold" : "navy"}>{u.role}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={u.isActive ? "success" : "danger"}>
                        {u.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-muted">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="Change role"
                          onClick={() => {
                            setRoleModalUser(u);
                            setNewRole(u.role);
                          }}
                          className="p-2 rounded-lg text-navy hover:bg-navy/5"
                        >
                          <ShieldCheck size={16} />
                        </button>
                        <button
                          title={u.isActive ? "Deactivate" : "Activate"}
                          onClick={() => setConfirmAction({ type: "toggle", user: u })}
                          className="p-2 rounded-lg text-yellow-600 hover:bg-yellow-50"
                        >
                          {u.isActive ? <Ban size={16} /> : <CheckCircle size={16} />}
                        </button>
                        <button
                          title="Delete"
                          onClick={() => setConfirmAction({ type: "delete", user: u })}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-5 pb-5">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </Card>

      {/* Create User Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Add New User"
        size="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              name="firstName"
              value={userForm.firstName}
              onChange={handleFormChange}
              error={formErrors.firstName}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={userForm.lastName}
              onChange={handleFormChange}
              error={formErrors.lastName}
              required
            />
          </div>
          <Input
            label="Email"
            name="email"
            type="email"
            value={userForm.email}
            onChange={handleFormChange}
            error={formErrors.email}
            required
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={userForm.phoneNumber}
            onChange={handleFormChange}
            error={formErrors.phoneNumber}
            required
          />
          <Select
            label="Role"
            name="role"
            options={USER_ROLES.map((r) => ({ value: r, label: r }))}
            value={userForm.role}
            onChange={handleFormChange}
            required
          />

          {userForm.role !== "Agent" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={userForm.dateOfBirth}
                  onChange={handleFormChange}
                  error={formErrors.dateOfBirth}
                  required
                />
                <Input
                  label="Nationality"
                  name="nationality"
                  value={userForm.nationality}
                  onChange={handleFormChange}
                  error={formErrors.nationality}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={userForm.password}
                  onChange={handleFormChange}
                  error={formErrors.password}
                  required
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={userForm.confirmPassword}
                  onChange={handleFormChange}
                  error={formErrors.confirmPassword}
                  required
                />
              </div>
            </>
          )}

          {userForm.role === "Agent" && (
            <p className="text-xs text-muted bg-soft p-3 rounded-lg">
              Agents are created without a password — an invitation/reset flow
              should be handled separately.
            </p>
          )}

          <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
            Create {userForm.role}
          </Button>
        </form>
      </Modal>

      {/* Change Role Modal */}
      <Modal
        isOpen={!!roleModalUser}
        onClose={() => setRoleModalUser(null)}
        title={`Change Role — ${roleModalUser?.fullName || ""}`}
        size="sm"
      >
        <div className="space-y-4">
          <Select
            label="New Role"
            options={USER_ROLES.map((r) => ({ value: r, label: r }))}
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <Button
            variant="primary"
            className="w-full"
            onClick={handleRoleSubmit}
            isLoading={isSubmitting}
          >
            Update Role
          </Button>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirmAction}
        isLoading={isSubmitting}
        variant={confirmAction?.type === "delete" ? "danger" : "primary"}
        title={confirmAction?.type === "delete" ? "Delete User" : "Change Status"}
        message={
          confirmAction?.type === "delete"
            ? `Are you sure you want to permanently delete ${confirmAction?.user?.fullName}? This cannot be undone.`
            : `Are you sure you want to ${
                confirmAction?.user?.isActive ? "deactivate" : "activate"
              } ${confirmAction?.user?.fullName}?`
        }
        confirmLabel={confirmAction?.type === "delete" ? "Delete" : "Confirm"}
      />
    </div>
  );
}